import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { movies } from "../movies";
// import Card from "../components/Card";
// import MoviesDrama from "../components/MoviesPop";
import MovieCarousel from "../components/MovieCarousel";
// import MoviesPop from "../components/MoviesPop";
import { genres, groupingOptions } from "../constants";
import { groupMovies } from "../logic/MovieUtils";

export default function HomeSectionMovies() {
  const navigate = useNavigate();
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGroupingDropdownOpen, setIsGroupingDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState<string>("");
  const [durationRange, setDurationRange] = useState<[number, number]>([
    0, 300,
  ]); // min y max duración en minutos

  // TODO: CREAR UN COMPONENTE PARA EL DROPDOWN DE GÉNEROS Y OTRO PARA EL DE AGRUPAMIENTO

  // Array de refs para los géneros
  const genreRefs = useRef<(HTMLLabelElement | null)[]>([]);

  const handleGenreChange = (genre: string) => {
    setGeneroSeleccionado((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRange: [number, number] = [...durationRange] as [number, number];
    newRange[index] = Number(event.target.value);
    setDurationRange(newRange);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // En español: alternarDropdownAgrupamiento (dropdown = desplegable)
  // funcion que cambia el estado de apertura/cierre del dropdown de agrupamiento
  const toggleGroupingDropdown = () => {
    setIsGroupingDropdownOpen(!isGroupingDropdownOpen);
  };

  const handleGroupingChange = (grouping: string) => {
    setSelectedGrouping(grouping);
    setIsGroupingDropdownOpen(false);
  };

  const getSelectedText = () => {
    if (generoSeleccionado.length === 0) return "Seleccionar géneros";
    if (generoSeleccionado.length === 1) {
      const genre = genres.find((g) => g.value === generoSeleccionado[0]);
      return genre?.label || "";
    }
    return `${generoSeleccionado.length} géneros seleccionados`;
  };

  const getGroupingText = () => {
    if (!selectedGrouping) return "Seleccionar agrupamiento";
    const grouping = groupingOptions.find((g) => g.value === selectedGrouping);
    return grouping?.label || "";
  };

  const filteredMovies =
    generoSeleccionado.length > 0
      ? movies.filter((movie) => {
          // Si la película tiene genre, verificar si coincide
          if (movie.genre) {
            return generoSeleccionado.includes(movie.genre.toLowerCase());
          }
          return false;
        })
      : movies;

  // Agrupar películas filtradas
  const groupedMovies = groupMovies(filteredMovies, selectedGrouping);

  return (
    <div className="p-4 text-white">
      <button
        className="border border-white/50 rounded-md p-2"
        onClick={() => navigate("/")}
      >
        volver al home
      </button>

      <h2>Películas</h2>

      {/* filtros */}
      <div className="grid grid-cols-4 px-2 gap-4">
        <div className="filtro-agrupamiento color-white bg-black border border-white/50 rounded-md p-4">
          <h3 className="text-white mb-3">Agrupar por</h3>

          {/* Dropdown de agrupamiento */}
          <div className="relative">
            <button
              onClick={toggleGroupingDropdown}
              className="w-full flex items-center justify-between bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 cursor-pointer hover:bg-gray-700"
            >
              <span>{getGroupingText()}</span>
              <span className="ml-2">{isGroupingDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {isGroupingDropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-10 bg-gray-900 border border-gray-600 rounded-b max-h-60 overflow-y-auto">
                <div className="space-y-1 p-2">
                  {groupingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleGroupingChange(option.value)}
                      className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="color-white bg-black border border-white/50 rounded-md p-4"></div>
        <div className="filtro-duracion bg-black border border-white/50 rounded-md p-4">
          <h3 className="text-white mb-3">Duración (minutos)</h3>

          <div className="flex items-center space-x-2 mb-2">
            <span>{durationRange[0]}</span>
            <input
              type="range"
              min={0}
              max={300}
              value={durationRange[0]}
              onChange={(e) => handleDurationChange(e, 0)}
              className="flex-1"
            />
            <input
              type="range"
              min={0}
              max={300}
              value={durationRange[1]}
              onChange={(e) => handleDurationChange(e, 1)}
              className="flex-1"
            />
            <span>{durationRange[1]}</span>
          </div>
        </div>

        <div className="filtro-genero color-white bg-black border border-white/50 rounded-md p-4">
          <h3 className="text-white mb-3">Géneros</h3>

          {/* Dropdown personalizado */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full flex items-center justify-between bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 cursor-pointer hover:bg-gray-700"
            >
              <span>{getSelectedText()}</span>
              <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-10 bg-gray-900 border border-gray-600 rounded-b max-h-60 overflow-y-auto">
                <div className="space-y-1 p-2">
                  {genres.map((genre, idx) => (
                    <label
                      key={genre.value}
                      ref={(el) => {
                        genreRefs.current[idx] = el;
                      }}
                      tabIndex={0}
                      className="flex items-center space-x-2 text-white cursor-pointer hover:bg-gray-700 p-1 rounded"
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const next = genreRefs.current[idx + 1];
                          if (next) next.focus();
                        }
                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          const prev = genreRefs.current[idx - 1];
                          if (prev) prev.focus();
                        }
                        if (e.key === "Enter" || e.key === " ") {
                          handleGenreChange(genre.value);
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        value={genre.value}
                        checked={generoSeleccionado.includes(genre.value)}
                        onChange={() => handleGenreChange(genre.value)}
                        className="w-4 h-4"
                      />
                      <span>{genre.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección de películas */}
      <div className="mt-8">
        <h3 className="text-white text-2xl mb-4">
          {selectedGrouping
            ? `Películas agrupadas ${getGroupingText().toLowerCase()}`
            : "Todas las películas"}
        </h3>
        {/* Aquí puedes agregar la lógica para mostrar las películas agrupadas */}
      </div>

      {/* Carruseles de películas agrupadas */}
      {/* <div className="mt-8 bg-gray-800 p-4 rounded-md"> */}
      {Object.entries(groupedMovies).map(([groupName, groupMovies]) => (
        // <div className="bg-gray-800 p-4 rounded-md mb-2" key={groupName}>
        <MovieCarousel
          key={groupName}
          title={groupName}
          movies={groupMovies}
          section={groupName}
        />
        // </div>
      ))}
      {/* </div> */}
    </div>
  );
}
