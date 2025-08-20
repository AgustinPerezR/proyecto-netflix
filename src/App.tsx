import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import HomeSectionMovies from "./pages/HomeSectionMovies";
import MoviePage from "./pages/MoviePage";
import SeriePage from "./pages/SeriePage";
import SearchPage from "./pages/SearchPage";
import WatchVideoPage from "./pages/WatchVideoPage";
import KeyboardNavigation from "./logic/KeyboardNavegation";
import KeyboardNavigationMovie from "./logic/KeyboardNavegationMovie";
import KeyboardNavigationSerie from "./logic/KeyboardNavigationSerie";

import { movies } from "./movies";

function preloadImages() {
  movies.forEach((movie) => {
    if (movie.poster) {
      const img = new Image();
      img.src = movie.poster;
    }
  });
}
preloadImages(); // ✅ Se ejecuta antes de renderizar cualquier componente

export default function App() {
  const location = useLocation();
  const isMoviePage = location.pathname.startsWith("/movie/");
  const isSeriePage = location.pathname.startsWith("/serie/");

  return (
    <div className="flex h-screen bg-black text-white">
      {/* <KeyboardNavigation /> */}
      {/* 🔹 Activamos solo una lógica de navegación */}
      {!isMoviePage && !isSeriePage && <KeyboardNavigation />}
      {isMoviePage && <KeyboardNavigationMovie />}
      {isSeriePage && <KeyboardNavigationSerie />}
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Routes>
          {/* Definimos las rutas de la pagina */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<HomeSectionMovies />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/serie/:id" element={<SeriePage />} />
          <Route path="/watch/:id" element={<WatchVideoPage />} />
        </Routes>
      </main>
    </div>
  );
}
