import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { movies } from "../movies";
import MovieCarousel from "../components/MovieCarousel";
import { genres, groupingOptions, orderByOptions } from "../constants";
import {
  groupMovies,
  filterMoviesByGenre,
  filterMoviesByDuration,
  sortMovies,
  sortGroupedMovies,
} from "../logic/MovieUtils";

import SingleSelectDropdown from "../components/SingleSelectDropdown";
import MultipleSelectDropdown from "../components/SelectDropdownMultiple";
import RangeSlider from "../components/RangeSlider";
import GridCards from "../components/GridCards";

export default function HomeSectionMovies() {
  const navigate = useNavigate();
  const [genresSelected, setGenresSelected] = useState<string[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const [durationRange, setDurationRange] = useState<[number, number]>([
    0, 300,
  ]); // min y max duración en minutos

  const handleGenreChange = (genre: string) => {
    setGenresSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const getGroupingText = () => {
    if (!selectedGrouping) return "Seleccionar agrupamiento";
    const grouping = groupingOptions.find((g) => g.value === selectedGrouping);
    return grouping?.label || "";
  };
  const getOrderText = () => {
    if (!selectedOrder) return "Seleccionar orden";
    const order = orderByOptions.find((o) => o.value === selectedOrder);
    return order?.label || "";
  };

  //aplico utils
  const moviesByDuration = filterMoviesByDuration(movies, durationRange);
  const filteredMovies = filterMoviesByGenre(moviesByDuration, genresSelected);
  const sortedMovies = sortMovies(filteredMovies, selectedOrder);
  const groupedMovies = groupMovies(sortedMovies, selectedGrouping);
  const groupedEntries = sortGroupedMovies(
    groupedMovies,
    selectedGrouping,
    selectedOrder
  );

  return (
    <div className="p-4 text-white">
      <button
        className="border border-white/50 rounded-md p-2"
        onClick={() => navigate("/")}
      >
        volver al home
      </button>

      {/* <h1>Películas</h1> */}

      {/* filtros */}
      <div className="grid grid-cols-4 px-2 gap-4">
        <SingleSelectDropdown
          label="Agrupar por: "
          options={groupingOptions.map((option) => option.label)}
          selected={getGroupingText()}
          onChange={(option) =>
            setSelectedGrouping(
              groupingOptions.find((g) => g.label === option)?.value || ""
            )
          }
        />
        <SingleSelectDropdown
          label="Ordenar por: "
          options={orderByOptions.map((option) => option.label)}
          selected={getOrderText()}
          onChange={(option) =>
            setSelectedOrder(
              orderByOptions.find((g) => g.label === option)?.value || ""
            )
          }
        />
        <div className="filtro-duracion bg-black border border-white/50 rounded-md p-4">
          <RangeSlider
            label="Duración (minutos)"
            values={durationRange}
            min={0}
            max={300}
            step={5}
            onChange={(vals) => setDurationRange(vals as [number, number])}
          />
        </div>
        <MultipleSelectDropdown
          label="Filtrar Géneros"
          options={genres}
          selected={genresSelected}
          onChange={handleGenreChange}
        />
      </div>

      {/* Sección de películas */}
      <div className="mt-8">
        <h3 className="text-white text-2xl mb-4">
          {selectedGrouping
            ? `Películas agrupadas ${getGroupingText().toLowerCase()}`
            : "Todas las películas"}
        </h3>
      </div>

      {/* Contenido de películas */}
      {selectedGrouping && selectedGrouping !== "none" ? (
        // Carruseles por grupo
        groupedEntries.map(([groupName, movies]) => (
          <MovieCarousel
            key={groupName}
            title={groupName}
            movies={movies}
            section={groupName}
          />
        ))
      ) : (
        // Grilla con todas las películas
        <GridCards media={groupedEntries.flatMap(([_, movies]) => movies)} />
      )}
    </div>
  );
}
