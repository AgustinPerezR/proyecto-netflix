import { series } from "../series.ts";
import CarouselSeason from "../components/CarouselSeasonSerie.tsx";
import ButtonEpisode from "../components/ButtonEpisode.tsx";
import BackButton from "../components/BackButton.tsx";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Props = { id?: number };

export default function SeriePage({ id }: Props) {
  const params = useParams();
  const numericId = id ?? Number(params.id);
  const serie = series.find((m) => m.id === numericId);
  const navigate = useNavigate();

  // Si la serie no existe o no tiene temporadas
  if (!serie || serie.seasons_data.length === 0) {
    return (
      <>
        <BackButton />
        <p className="text-center text-white mt-10 font-handwritten">
          Serie no encontrada.
        </p>
      </>
    );
  }

  // Inicializamos seasonsData copiando la estructura original
  const [seasonsData, setSeasonsData] = useState(() =>
    serie?.seasons_data.map((season) => ({
      ...season,
      episodes: season.episodes.map((ep) => ({
        ...ep,
        progress: ep.progress ?? 0,
      })),
    }))
  );

  // Controlamos la temporada seleccionada con su número
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(
    serie?.seasons_data[0].season_number
  );

  // Obtenemos la temporada seleccionada desde seasonsData (NO del JSON original)
  const selectedSeason = seasonsData?.find(
    (season) => season.season_number === selectedSeasonNumber
  );

  // ✅ Actualiza el progreso de un episodio
  const updateEpisodeProgress = (
    seasonNumber: number,
    episodeNumber: number,
    newProgress: number
  ) => {
    setSeasonsData((prev) =>
      prev?.map((season) =>
        season.season_number === seasonNumber
          ? {
              ...season,
              episodes: season.episodes.map((ep) =>
                ep.number === episodeNumber
                  ? { ...ep, progress: newProgress }
                  : ep
              ),
            }
          : season
      )
    );
  };

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
      {/* Botón volver */}
      <BackButton />

      {/* Header con info */}
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
        <div className="flex flex-col justify-start gap-4 bg-black/0 p-4 basis-[70%]">
          <h1 className="text-4xl font-bold">{serie.title}</h1>
          <p className="text-lg">{serie.synopsis}</p>
          <p className="text-md font-semibold">Creador: {serie.creator}</p>

          {/* Carrusel de temporadas */}
          <div className="justify-left mt-4 p-4 bg-black/10 rounded-lg">
            <CarouselSeason
              selectedIndex={seasonsData.findIndex(
                (season) => season.season_number === selectedSeasonNumber
              )}
              seasons_data={seasonsData}
              onSelectSeason={(season) =>
                setSelectedSeasonNumber(season.season_number)
              }
            />
          </div>
        </div>
      </div>

      {/* Lista de episodios */}

      {selectedSeason && (
        <div className="bg-black/10 p-4 rounded-lg mt-0">
          <h2 className="text-2xl font-bold text-white mb-4">
            Temporada {selectedSeason.season_number}
          </h2>
          <div className="flex flex-wrap gap-4" data-section="episodes">
            {selectedSeason.episodes.map((ep) => (
              <ButtonEpisode
                key={ep.number}
                episodeNumber={ep.number}
                seasonNumber={selectedSeason.season_number}
                colorSeason={selectedSeason.color}
                progress={ep.progress}
                onChangeProgress={(newProgress) =>
                  updateEpisodeProgress(
                    selectedSeason.season_number,
                    ep.number,
                    newProgress
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
