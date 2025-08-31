// movieUtils.ts
import { genres } from "../constants";
import type { Movie } from "../types";

// devuelve la duración en minutos
const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)h\s*(\d+)?min?/i);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  }
  const minMatch = duration.match(/(\d+)\s*min/i);
  if (minMatch) return parseInt(minMatch[1], 10);
  return 0;
};

const durationOrder = (label: string) => {
  switch (label) {
    case "Menos de 1h 30min":
      return 90;
    case "Entre 1h 30min y 2h":
      return 120;
    case "Entre 2h y 2h 30min":
      return 150;
    case "Entre 2h 30min y 3h":
      return 180;
    case "Más de 3h":
      return 999; // arbitrario para el grupo más largo
    default:
      return 0;
  }
};
// Devuelve un diccionario de películas agrupadas por década.
// ejemplo de acceso: groupByDecade(movies)["Años 90s"]
export const groupByDecade = (movies: Movie[]) => {
  const groups: Record<string, Movie[]> = {};
  movies.forEach((movie) => {
    const decade = Math.floor(movie.year / 10) * 10;
    const key = `Años ${decade}s`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(movie);
  });

  // ordenar grupos de mas reciente a mas antiguo
  const sortedGroups = Object.entries(groups).sort((a, b) => {
    const yearA = parseInt(a[0].match(/\d+/)?.[0] || "0");
    const yearB = parseInt(b[0].match(/\d+/)?.[0] || "0");
    return yearB - yearA; // Ordenar de más reciente a más antiguo
  });
  const orderedGroups: Record<string, any[]> = {};
  sortedGroups.forEach(([key, value]) => {
    orderedGroups[key] = value;
  });
  return orderedGroups;
};

// Agrupa las películas por género y devuelve en forma de diccionario.
export const groupByGenre = (movies: Movie[]) => {
  const groups: Record<string, Movie[]> = {};

  // Primero crear grupos para cada género definido
  genres.forEach((genre) => {
    groups[genre.label] = [];
    movies.forEach((movie) => {
      if (movie.genre && movie.genre.includes(genre.value)) {
        groups[genre.label].push(movie);
      }
    });
  });
  // Luego, agregar películas sin género a "Sin clasificar"
  movies.forEach((movie) => {
    if (!movie.genre) {
      if (!groups["Sin clasificar"]) groups["Sin clasificar"] = [];
      groups["Sin clasificar"].push(movie);
    }
  });

  // Borrar grupos vacíos
  const filteredGroups: Record<string, Movie[]> = {};
  Object.entries(groups).forEach(([key, movies]) => {
    if (movies.length > 0) {
      filteredGroups[key] = movies;
    }
  });

  return filteredGroups;
};

export const groupByDirector = (movies: any[]) => {
  const groups: Record<string, any[]> = {};
  movies.forEach((movie) => {
    const key = `Películas de ${movie.director}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(movie);
  });
  return groups;
};
export const groupByDuration = (movies: any[]) => {
  const groups: Record<string, any[]> = {
    "Menos de 1h 30min": [],
    "Entre 1h 30min y 2h": [],
    "Entre 2h y 2h 30min": [],
    "Entre 2h 30min y 3h": [],
    "Más de 3h": [],
  };

  movies.forEach((movie) => {
    const mins = parseDuration(movie.duration);
    if (mins < 90) groups["Menos de 1h 30min"].push(movie);
    else if (mins < 120) groups["Entre 1h 30min y 2h"].push(movie);
    else if (mins < 150) groups["Entre 2h y 2h 30min"].push(movie);
    else if (mins < 180) groups["Entre 2h 30min y 3h"].push(movie);
    else groups["Más de 3h"].push(movie);
  });

  return groups;
};

export const groupMovies = (movies: any[], grouping: string) => {
  switch (grouping) {
    case "decade":
      return groupByDecade(movies);
    case "genre":
      return groupByGenre(movies);
    case "director":
      return groupByDirector(movies);
    case "duration":
      return groupByDuration(movies);
    default:
      return { "Todas las películas": movies };
  }
};

// ordenamiento:
export const sortMovies = (movies: Movie[], order: string) => {
  const sorted = [...movies]; // copiamos el array original
  switch (order) {
    case "title_asc": //de la A a la Z
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title_desc": //de la Z a la A
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "year_asc": //del más antiguo al más reciente
      return sorted.sort((a, b) => a.year - b.year);
    case "year_desc": //del más reciente al más antiguo
      return sorted.sort((a, b) => b.year - a.year);
    case "duration_asc": //de menor a mayor duración
      return sorted.sort(
        (a, b) => parseDuration(a.duration) - parseDuration(b.duration)
      );
    case "duration_desc": //de mayor a menor duración
      return sorted.sort(
        (a, b) => parseDuration(b.duration) - parseDuration(a.duration)
      );
    default:
      return sorted;
  }
};

export const sortGroupedMovies = (
  grouped: Record<string, Movie[]>,
  grouping: string,
  selectedOrder: string
): [string, Movie[]][] => {
  const entries = Object.entries(grouped);

  if (grouping === "decade") {
    entries.sort((a, b) => {
      const yearA = parseInt(a[0].match(/\d+/)?.[0] || "0");
      const yearB = parseInt(b[0].match(/\d+/)?.[0] || "0");
      return selectedOrder === "year_asc" ? yearA - yearB : yearB - yearA;
    });
  } else if (grouping === "genre" || grouping === "director") {
    entries.sort((a, b) =>
      selectedOrder === "title_desc"
        ? b[0].localeCompare(a[0])
        : a[0].localeCompare(b[0])
    );
  } else if (grouping === "duration") {
    entries.sort((a, b) => {
      return selectedOrder === "duration_desc"
        ? durationOrder(b[0]) - durationOrder(a[0])
        : durationOrder(a[0]) - durationOrder(b[0]);
    });
  }

  return entries;
};

export const filterMoviesByGenre = (
  movies: Movie[],
  selectedGenres: string[]
) =>
  selectedGenres.length === 0
    ? movies
    : movies.filter(
        (m) => m.genre && m.genre.some((g) => selectedGenres.includes(g))
      );

export const filterMoviesByDuration = (
  movies: Movie[],
  durationRange: [number, number]
) =>
  movies.filter(
    (m) =>
      parseDuration(m.duration) >= durationRange[0] &&
      parseDuration(m.duration) <= durationRange[1]
  );
