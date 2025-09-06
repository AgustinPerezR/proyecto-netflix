import { useNavigate } from "react-router-dom";
import { useState, useRef, use, useEffect } from "react";
import { series } from "../series";
import { movies } from "../movies";

import MovieCarousel from "../components/MovieCarousel";
import { genres, groupingOptions, orderByOptions } from "../constants";
import {
  groupMovies,
  filterByGenre,
  sortMedia,
  sortGroupedMovies,
} from "../logic/MovieUtils";

import SingleSelectDropdown from "../components/SelectDropdownSingle";
import MultipleSelectDropdown from "../components/SelectDropdownMultiple";
import RangeSlider from "../components/RangeSlider";
import GridCards from "../components/GridCards";

// import { getSectionNames } from "../logic/NavUtils";
import KeyNavHomeSection from "../logic/KeyNavHomeSection";

const animation_movies = movies.filter((m) => m.group == "animation");
const animation_series = series.filter((s) => s.group === "animation");

const animation_media = [...animation_movies, ...animation_series];
console.log("animation", animation_media);

export default function HomeSectionAnimation() {
  const navigate = useNavigate();
  const [genresSelected, setGenresSelected] = useState<string[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");

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

  const filteredseries = filterByGenre(animation_media, genresSelected);
  const sortedseries = sortMedia(filteredseries, selectedOrder);
  const groupedseries = groupMovies(sortedseries, selectedGrouping);
  const groupedEntries = sortGroupedMovies(
    groupedseries,
    selectedGrouping,
    selectedOrder
  );

  return (
    <div className="p-4 text-white">
      <KeyNavHomeSection />;
      <button
        className="border border-white/50 rounded-md p-2"
        onClick={() => navigate("/")}
      >
        volver al home
      </button>
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
            ? `Productos agrupadas ${getGroupingText().toLowerCase()}`
            : "Todos los productos"}
        </h3>
      </div>
      {/* Contenido de películas */}
      {selectedGrouping && selectedGrouping !== "none" ? (
        // Carruseles por grupo
        groupedEntries.map(([groupName, animation_media]) => (
          <MovieCarousel
            key={groupName}
            title={groupName}
            movies={animation_media}
            section={groupName}
          />
        ))
      ) : (
        // Grilla con todas las películas
        <GridCards
          media={groupedEntries.flatMap(
            ([_, animation_media]) => animation_media
          )}
        />
      )}
    </div>
  );
}
