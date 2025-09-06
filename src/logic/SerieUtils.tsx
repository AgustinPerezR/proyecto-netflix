// movieUtils.ts
import { genres } from "../constants";
import type { Serie } from "../types";

// Devuelve un diccionario de series agrupadas por década.
// ejemplo de acceso: groupByDecade(series)["Años 90s"]
export const groupByDecade = (series: Serie[]) => {
  const groups: Record<string, Serie[]> = {};
  series.forEach((serie) => {
    const decade = Math.floor(serie.year / 10) * 10;
    const key = `Años ${decade}s`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(serie);
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

// Agrupa las series por género y devuelve en forma de diccionario.
export const groupByGenre = (series: Serie[]) => {
  const groups: Record<string, Serie[]> = {};

  // Primero crear grupos para cada género definido
  genres.forEach((genre) => {
    groups[genre.label] = [];
    series.forEach((serie) => {
      if (serie.genre && serie.genre.includes(genre.value)) {
        groups[genre.label].push(serie);
      }
    });
  });
  // Luego, agregar series sin género a "Sin clasificar"
  series.forEach((serie) => {
    if (!serie.genre) {
      if (!groups["Sin clasificar"]) groups["Sin clasificar"] = [];
      groups["Sin clasificar"].push(serie);
    }
  });

  // Borrar grupos vacíos
  const filteredGroups: Record<string, Serie[]> = {};
  Object.entries(groups).forEach(([key, series]) => {
    if (series.length > 0) {
      filteredGroups[key] = series;
    }
  });

  return filteredGroups;
};

export const groupByDirector = (series: any[]) => {
  const groups: Record<string, any[]> = {};
  series.forEach((movie) => {
    const key = `Películas de ${movie.director}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(movie);
  });
  return groups;
};

export const groupBySeasonCount = (series: any[]) => {
  const groups: Record<string, any[]> = {
    "1 temporada": [],
    "2 temporadas": [],
    "3 temporadas": [],
    "4 temporadas": [],
    "5 temporadas": [],
    "Más de 5 temporadas": [],
  };

  series.forEach((serie) => {
    const count = serie.seasons || 0;
    if (count === 1) groups["1 temporada"].push(serie);
    else if (count === 2) groups["2 temporadas"].push(serie);
    else if (count === 3) groups["3 temporadas"].push(serie);
    else if (count === 4) groups["4 temporadas"].push(serie);
    else if (count === 5) groups["5 temporadas"].push(serie);
    else groups["Más de 5 temporadas"].push(serie);
  });

  return groups;
};

export const groupByEpisodesCount = (series: any[]) => {
  const groups: Record<string, any[]> = {
    "1-10 episodios": [],
    "11-20 episodios": [],
    "21-50 episodios": [],
    "51-70 episodios": [],
    "71-100 episodios": [],
    "Más de 100 episodios": [],
  };
  series.forEach((serie) => {
    const count = serie.episodes || 0;
    if (count >= 1 && count <= 10) groups["1-10 episodios"].push(serie);
    else if (count >= 11 && count <= 20) groups["11-20 episodios"].push(serie);
    else if (count >= 21 && count <= 50) groups["21-50 episodios"].push(serie);
    else if (count >= 51 && count <= 70) groups["51-70 episodios"].push(serie);
    else if (count >= 71 && count <= 100)
      groups["71-100 episodios"].push(serie);
    else if (count > 100) groups["Más de 100 episodios"].push(serie);
  });

  return groups;
};

export const groupSeries = (series: any[], grouping: string) => {
  switch (grouping) {
    case "decade":
      return groupByDecade(series);
    case "genre":
      return groupByGenre(series);
    case "director":
      return groupByDirector(series);
    case "season_count":
      return groupBySeasonCount(series);
    case "episodes_count":
      return groupByEpisodesCount(series);
    default:
      return { "Todas las películas": series };
  }
};

// ordenamiento:
export const sortSeries = (series: Serie[], order: string) => {
  const sorted = [...series]; // copiamos el array original
  switch (order) {
    case "title_asc": //de la A a la Z
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title_desc": //de la Z a la A
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "year_asc": //del más antiguo al más reciente
      return sorted.sort((a, b) => a.year - b.year);
    case "year_desc": //del más reciente al más antiguo
      return sorted.sort((a, b) => b.year - a.year);
    case "seasons_count_asc": //de menor a mayor duración
      return sorted.sort((a, b) => (a.seasons || 0) - (b.seasons || 0));
    case "seasons_count_desc": //de mayor a menor duración
      return sorted.sort((a, b) => (b.seasons || 0) - (a.seasons || 0));
    case "episodes_count_asc": //de menor a mayor duración
      return sorted.sort((a, b) => (a.episodes || 0) - (b.episodes || 0));
    case "episodes_count_desc": //de mayor a menor duración
      return sorted.sort((a, b) => (b.episodes || 0) - (a.episodes || 0));

    default:
      return sorted;
  }
};

export const sortGroupedSeries = (
  grouped: Record<string, Serie[]>,
  grouping: string,
  selectedOrder: string
): [string, Serie[]][] => {
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
  }
  //   else if (grouping === "duration") {
  //     entries.sort((a, b) => {
  //       return selectedOrder === "duration_desc"
  //         ? durationOrder(b[0]) - durationOrder(a[0])
  //         : durationOrder(a[0]) - durationOrder(b[0]);
  //     });
  //   }

  return entries;
};

export const filterSeriesByGenre = (
  series: Serie[],
  selectedGenres: string[]
) =>
  selectedGenres.length === 0
    ? series
    : series.filter(
        (m) => m.genre && m.genre.some((g) => selectedGenres.includes(g))
      );

export const filterSeriesBySeasonsCount = (
  series: Serie[],
  seasons_range: [number, number]
) => {
  return series.filter(
    (s) => s.seasons >= seasons_range[0] && s.seasons <= seasons_range[1]
  );
};

export const filterSeriesByEpisodesCount = (
  series: Serie[],
  episodes_range: [number, number]
) => {
  return series.filter(
    (s) => s.episodes >= episodes_range[0] && s.episodes <= episodes_range[1]
  );
};
