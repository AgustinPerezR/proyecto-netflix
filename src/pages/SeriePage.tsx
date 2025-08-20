import { series } from "../series.ts";
import CarouselSeason from "../components/CarouselSeasonSerie.tsx";
import CardSeason from "../components/CardSeason.tsx";
import ButtonEpisode from "../components/ButtonEpisode.tsx";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Props = { id?: number };

export default function SeriePage({ id }: Props) {
  const params = useParams();
  const numericId = id ?? Number(params.id);
  const serie = series.find((m) => m.id === numericId);
  const navigate = useNavigate();
  // const DEFAULT_SELECTED_CARD = 0;
  const [selectedSeason, setSelectedSeason] = useState(serie?.seasons_data[0]);

  // const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(
  //   DEFAULT_SELECTED_CARD
  // );

  if (!serie) {
    return (
      <p className="text-center text-red-500 mt-10 font-handwritten">
        Serie no encontrada.
      </p>
    );
  }

  return (
    <div
      className="px-8 pt-2 flex flex-col min-h-screen"
      style={{
        backgroundImage: `radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.7) 90%), url(${serie.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <button
        onClick={() => navigate("/")}
        className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full w-fit"
        aria-label="Volver al inicio"
        tabIndex={0}
        data-section="back"
      >
        ←
      </button>

      <div className="flex text-white mt-4">
        {/* Columna izquierda - Poster */}
        <div className="flex flex-col items-center bg-black/0 p-4 rounded-xl basis-[20%]">
          <img
            src={serie.poster}
            alt={serie.title}
            className="poster rounded-xl w-full aspect-[2/3] object-cover border border-white/50"
            style={{ "--poster-color": serie.color } as React.CSSProperties}
          />
          <p className="mt-4 text-xl">{serie.episodes} episodios</p>
        </div>

        {/* Columna central - Información */}
        <div className="flex flex-col justify-start gap-4 bg-black/0 p-4  basis-[70%]">
          <h1 className="text-4xl font-bold">{serie.title}</h1>
          <p className="text-lg">{serie.synopsis}</p>
          <p className="text-md font-semibold">Creador: {serie.creator}</p>

          <div className=" justify-left mt-4 p-4 bg-black/10 rounded-lg">
            <CarouselSeason
              selectedIndex={serie.seasons_data.findIndex(
                (season) =>
                  season.season_number === selectedSeason?.season_number
              )}
              seasons_data={serie.seasons_data}
              onSelectSeason={setSelectedSeason}
            />
          </div>
        </div>
      </div>

      {/* Episodios */}
      {selectedSeason && (
        <div className="bg-black/10 p-4 rounded-lg mt-0">
          <h2 className="text-2xl font-bold text-white mb-4">
            Temporada {selectedSeason?.season_number}
          </h2>
          <div className="flex flex-wrap gap-4" data-section="episodes">
            {Array.from({ length: selectedSeason?.episodes || 0 }, (_, i) => (
              <ButtonEpisode
                key={i + 1}
                episodeNumber={i + 1}
                seasonNumber={selectedSeason?.season_number || 0}
                colorSeason={selectedSeason?.color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
