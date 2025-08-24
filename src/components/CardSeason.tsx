import { type SeasonSerie } from "../types.tsx";
import React from "react";
import "./CardSeason.css";

type CardSeasonProps = {
  data: SeasonSerie;
  index: number;
  totalCards: number;
  onCardHover?: (index: number) => void;
  onCardLeave?: () => void;
  onClick?: () => void;

  hoveredIndex?: number | null;
  selectedIndex?: number; // 🔹 agregado
};

const CardSeason: React.FC<CardSeasonProps> = ({
  data,
  index,
  totalCards,
  onCardHover,
  onCardLeave,
  onClick,
  hoveredIndex,
  selectedIndex,
}) => {
  const handleClick = () => onClick?.();

  // 🔹 offset entre esta card y la seleccionada
  const offset = index - (selectedIndex ?? 0);

  // 🔹 si offset está dentro de posiciones, usamos ese valor
  // const currentPos = posiciones.includes(offset) ? offset : posiciones[0];

  // 🔹 zIndex = más alto cuanto más cerca de 0 esté
  const zIndex = 100 - Math.abs(offset);

  return (
    <div
      // className="card-season w-60 cursor-pointer rounded-xl relative  transition-transform duration-500"
      className={`card-season w-48 ${
        selectedIndex === index ? "selected" : ""
      } flex rounded-xl aspect-[2/3] cursor-pointer overflow-hidden`}
      tabIndex={0}
      style={
        {
          "--card-color": data.color,
          "--translate-y": "-15px",
          zIndex,
        } as React.CSSProperties
      }
      onClick={handleClick}
      onMouseEnter={() => onCardHover?.(index)}
      onFocus={() => onCardHover?.(index)}
      onMouseLeave={() => onCardLeave?.()}
    >
      <img
        src={data.poster}
        alt={String(data.season_number)}
        className=" img object-cover w-full "
      />
    </div>
  );
};

export default CardSeason;
