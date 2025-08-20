import { useRef, useEffect, useState } from "react";
import type { SeasonSerie } from "../types.ts";
import CardSeason from "./CardSeason.tsx";
import "./CardSeason.css";

type CarouselProps = {
  selectedIndex: number;
  seasons_data: SeasonSerie[];
  onSelectSeason?: (season: SeasonSerie) => void;
};

export default function Carousel({
  selectedIndex,
  seasons_data,
  onSelectSeason,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [widthCarrusel, setWidthCarrusel] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setWidthCarrusel(scrollContainerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (scrollContainerRef.current) {
        setWidthCarrusel(scrollContainerRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const n = seasons_data.length;
  const cant_puntos = 2 * n - 1;

  // todos los puntos globales
  const puntos = Array.from({ length: cant_puntos }, (_, i) => i - (n - 1));
  // console.log("Puntos:", puntos);

  return (
    // <div className="carousel-container relative group border border-white/30 bg-black rounded-lg">
    <div className="carousel-container flex" data-section="carousel">
      {seasons_data.map((season, index) => {
        // para cada card, sus posiciones posibles
        const posiciones = puntos.slice(index, index + n);

        return (
          <CardSeason
            key={season.season_number}
            data={season}
            index={index}
            totalCards={n}
            selectedIndex={selectedIndex}
            posiciones={posiciones} // 👈 ahora la card sabe dónde puede estar
            onClick={() => onSelectSeason?.(season)}
            onCardHover={() => onSelectSeason?.(season)}
          />
        );
      })}
      {/* </div> */}
    </div>
  );
}
