import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { movies } from "../movies";
import { series } from "../series"; // asegúrate de tener tu lista de series

const allMedia = [...movies, ...series]; // combinar películas y series

const keyboardKeys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  " ",
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Filtrar películas a medida que escribe
  const filteredMovies = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase().trim();

    if (!q) return [];

    const matches = allMedia
      .map((item) => {
        const title = item.title.toLowerCase();

        // Buscar solo coincidencias de palabra completa
        const index = title
          .split(/\s+/)
          .findIndex((word) => word.startsWith(q));
        if (index !== -1) {
          // Encontró palabra que empieza con query, devolver índice de esa palabra en el string completo
          const wordIndex = title.indexOf(title.split(/\s+/)[index]);
          return { item, index: wordIndex };
        }

        return null;
      })
      .filter(
        (m): m is { item: (typeof allMedia)[0]; index: number } => m !== null
      )
      .sort((a, b) => a.index - b.index)
      .map((m) => m.item);

    return matches;
  }, [query]);

  const handleKeyPress = (key: string) => {
    setQuery((prev) => prev + key);
  };

  const handleBackspace = () => {
    setQuery((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex h-screen text-white bg-slate-900">
      {/* Teclado */}
      <div className="w-1/4 p-4 bg-gray-800 flex flex-col justify-start items-center">
        <div className="pt-8 grid grid-cols-10 gap-2 mb-2">
          {keyboardKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          onClick={handleBackspace}
          className="mt-4 p-2 bg-red-600 rounded hover:bg-red-500"
        >
          Borrar
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe para buscar..."
          className="w-full p-3 rounded text-black mb-6"
        />

        {query &&
          (filteredMovies.length > 0 ? (
            <ul className="space-y-2">
              {filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="flex p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                  tabIndex={0} // Permite navegación por teclado
                  onClick={() => {
                    if (movie.type === "movie") {
                      navigate(`/movie/${movie.id}`);
                    } else if (movie.type === "serie") {
                      navigate(`/serie/${movie.id}`);
                    }
                  }}
                >
                  <img
                    className="w-30 h-40 mr-2"
                    src={movie.poster}
                    alt={movie.title}
                  />
                  {movie.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sin coincidencias</p>
          ))}
      </div>
    </div>
  );
}
