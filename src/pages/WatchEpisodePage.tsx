import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { series } from "../series";
import { seriesVideos } from "../videos";
import type { Serie } from "../types";

// Función auxiliar para extraer ID de Google Drive
const extractDriveId = (url: string | undefined): string | null => {
  if (!url) return null;
  const match = url.match(/\/d\/([^/]+)\//);
  return match ? match[1] : null;
};

export default function WatchEpisodePage() {
  const { id, season, episode } = useParams(); // episode y season solo se usan si es serie
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const numericId = Number(id);
  const seasonNum = season ? Number(season) : undefined;
  const episodeNum = episode ? Number(episode) : undefined;

  if (!seasonNum || !episodeNum) {
    return (
      <p className="text-center text-red-500 mt-10">
        Temporada o episodio no especificado.
      </p>
    );
  }

  // Buscar el media (puede ser película o serie)
  const serie: Serie | undefined = series.find((s) => s.id === numericId);

  // Obtener videoId unificado
  const videoId = extractDriveId(
    seriesVideos[numericId]?.[seasonNum]?.[episodeNum]
  );

  useEffect(() => {
    // Pedir pantalla completa al cargar
    const iframe = iframeRef.current;

    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {
        console.warn("No se pudo activar fullscreen automáticamente");
      });
    }

    // Manejar Escape para volver atrás
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);

      // Detectar Enter o Space
      if (e.key === " " || e.key === "Enter") {
        iframe?.focus(); // enfoca el iframe
        // Hack: enviar un evento de teclado simulado
        iframe?.contentWindow?.postMessage(
          { type: "keypress", key: e.key },
          "*"
        );
        console.log("Evento de teclado simulado enviado al iframe");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (!serie || !videoId) {
    return (
      <p className="text-center text-red-500 mt-10">Video no encontrado.</p>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white/10 px-4 py-2 rounded hover:bg-white/20"
      >
        ← Volver
      </button>

      <h1 className="text-2xl mb-4">
        {serie.title}{" "}
        {serie.type === "serie" && seasonNum && episodeNum
          ? `- Temporada ${seasonNum}, Episodio ${episodeNum}`
          : ""}
      </h1>

      <div className="w-full max-w-4xl aspect-video">
        <iframe
          ref={iframeRef}
          src={`https://drive.google.com/file/d/${videoId}/preview`}
          width="100%"
          height="100%"
          allow="autoplay"
          allowFullScreen
          className="rounded-xl border border-black/10"
        ></iframe>
      </div>
    </div>
  );
}
