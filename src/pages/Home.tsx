//Home.tsx
import TopMenu from "../components/TopMenu";
import RecentlyAdded from "../components/RecentlyAdded";
import ContinueWatching from "../components/ContinueWatching";
import SeriesPop from "../components/SeriesPop";
import MoviesPop from "../components/MoviesPop";
import MoviesDrama from "../components/MoviesDrama.tsx";
import { useEffect } from "react";
import { movies } from "../movies.ts";

// 🔹 1. Restaurar scroll y foco
function restoreScrollAndFocus() {
  const savedScroll = sessionStorage.getItem("homeScrollTop");
  const savedCardId = sessionStorage.getItem("selectedCardId");

  if (savedScroll) {
    window.scrollTo(1, parseInt(savedScroll));
  }

  if (savedCardId) {
    const card = document.querySelector(
      `[data-id='${savedCardId}']`
    ) as HTMLElement;
    if (card) {
      card.focus();
    }
  }
}

// 🔹 2. Limpiar sessionStorage
function clearSessionStorageKeys(keys: string[]) {
  keys.forEach((key) => sessionStorage.removeItem(key));
}

// 🔹 3. Manejo del teclado
function setupKeyboardNavigation() {
  const handleKeyDown = (e: KeyboardEvent) => {
    const focusables = Array.from(
      document.querySelectorAll<HTMLDivElement>(".card")
    );
    const active = document.activeElement as HTMLDivElement;
    const index = focusables.indexOf(active);
    if (index === -1) return;

    const currentSection = active.dataset.section;
    let target: HTMLElement | null = null;

    if (
      e.key === "ArrowRight" &&
      focusables[index + 1]?.dataset.section === currentSection
    ) {
      target = focusables[index + 1] || null;
    } else if (
      e.key === "ArrowLeft" &&
      focusables[index - 1]?.dataset.section === currentSection
    ) {
      target = focusables[index - 1] || null;
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const currentRect = active.getBoundingClientRect();
      const isDown = e.key === "ArrowDown";

      const candidates = focusables.filter(
        (el) => el.dataset.section !== currentSection
      );

      const aligned = candidates
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const verticalDistance = rect.top - currentRect.top;
          const horizontalDistance = Math.abs(rect.left - currentRect.left);

          return {
            el,
            isInDirection: isDown ? verticalDistance > 0 : verticalDistance < 0,
            verticalDistance: Math.abs(verticalDistance),
            horizontalDistance,
            totalDistance: Math.abs(verticalDistance) + horizontalDistance,
          };
        })
        .filter((entry) => entry.isInDirection)
        .sort((a, b) => {
          if (a.verticalDistance !== b.verticalDistance) {
            return a.verticalDistance - b.verticalDistance;
          }
          return a.horizontalDistance - b.horizontalDistance;
        });

      target = aligned[0]?.el || null;
    }

    if (target) {
      e.preventDefault();
      target.focus();
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      const carouselContainer = target.closest(".carousel-container");
      if (carouselContainer) {
        carouselContainer.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}

// 🔹 4. Componente principal
export default function Home() {
  // useEffect(() => {
  //   restoreScrollAndFocus();
  //   clearSessionStorageKeys(["homeScrollTop", "selectedCardId"]);
  //   // Precargar fondos
  //   movies.forEach((movie) => {
  //     const img = new Image();
  //     img.src = movie.background;
  //   });

  //   const cleanup = setupKeyboardNavigation();
  //   return cleanup;
  // }, []);

  return (
    <div className="space-y-6 p-4">
      <TopMenu />
      <h2 className="text-white text-xl font-mono">Agregados recientemente</h2>
      <RecentlyAdded />
      <h2 className="text-white text-xl font-mono">Continuar viendo...</h2>
      <ContinueWatching />
      <h2 className="text-white text-xl font-mono">Series populares</h2>
      <SeriesPop />
      <h2 className="text-white text-xl font-mono">Películas</h2>
      <MoviesPop />
      <h2 className="text-white text-xl font-mono">Películas de Drama</h2>
      <MoviesDrama />
    </div>
  );
}
