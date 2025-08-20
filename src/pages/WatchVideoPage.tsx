import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../movies.ts";

export default function WatchVideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const numericId = Number(id);
  const movie = movies.find((m) => m.id === numericId);

  // Hardcode temporal
  const videoId = "1m1WU5MOnV-x1iZCOdN31iNO0PR-6hftE";

  useEffect(() => {
    // Pedir pantalla completa al cargar
    const iframe = iframeRef.current;

    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {
        // Algunos navegadores no permiten esto automáticamente
        console.warn("No se pudo activar fullscreen automáticamente");
      });
    }

    // Manejar Escape para volver atrás
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (!movie) {
    return (
      <p className="text-center text-red-500 mt-10">Película no encontrada.</p>
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

      <h1 className="text-2xl mb-4">{movie.title}</h1>

      <div className="w-full max-w-4xl aspect-video">
        <iframe
          ref={iframeRef}
          src={`https://drive.google.com/file/d/${videoId}/preview`}
          width="100%"
          height="100%"
          allow="autoplay"
          allowFullScreen
          className="rounded-xl border border-white/20"
        ></iframe>
      </div>
    </div>
  );
}
