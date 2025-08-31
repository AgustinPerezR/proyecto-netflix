import { useNavigate } from "react-router-dom";

import type { Media } from "../types.tsx"; // Asegúrate de que la ruta sea correcta

type CardProps = {
  section: string;
  media: Media;
};

export default function Card({ section, media }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (media.type === "serie") {
      navigate(`/serie/${media.id}`); // Reemplaza con el ID de la serie
    } else if (media.type === "movie") {
      navigate(`/movie/${media.id}`); // Reemplaza con el ID de la película
    }
  };

  return (
    <div
      className={`card w-60 aspect-[2/3] bg-neutral-800
                  rounded-xl border border-white/30
                  transition-all duration-300 cursor-pointer overflow-hidden relative`}
      tabIndex={0} // ← clave para navegación por teclado
      data-id={media.id}
      data-section={section}
      style={{ "--card-color": media.color } as React.CSSProperties}
      // onClick={() => handleClick()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
    >
      <img
        src={media.poster}
        alt={media.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
