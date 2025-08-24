import { useRef, useEffect, useState } from "react";
import type { SeasonSerie } from "../types.ts";
import CardSeason from "./CardSeason.tsx";

type CarouselProps = {
  selectedIndex: number;
  seasons_data: SeasonSerie[];
  onSelectSeason?: (season: SeasonSerie) => void;
};

export default function CarouselSeason({
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
  return (
    <div className="carousel-container flex" data-section="seasons">
      {seasons_data.map((season, index) => {
        // para cada card, sus posiciones posibles

        return (
          <CardSeason
            key={season.season_number}
            data={season}
            index={index}
            totalCards={n}
            selectedIndex={selectedIndex}
            onClick={() => onSelectSeason?.(season)}
            onCardHover={() => onSelectSeason?.(season)}
          />
        );
      })}
    </div>
  );
}
