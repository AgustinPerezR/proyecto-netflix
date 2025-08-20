import { useParams } from "react-router-dom";
import { movies } from "../movies.ts";
import { useNavigate } from "react-router-dom";

type Props = {
  id?: number;
};

export default function MoviePage({ id }: Props) {
  const params = useParams();
  const numericId = id ?? Number(params.id);
  const movie = movies.find((m) => m.id === numericId);

  if (!movie) {
    return (
      <p className="text-center text-red-500 mt-10 font-handwritten">
        Película no encontrada.
      </p>
    );
  }
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-1 justify-start items-start p-10 "
      style={{
        backgroundImage: `
      radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.7) 90%),
      url(${movie.background})
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left column */}

      <div
        className={`w-full max-w-xs flex flex-col items-center p-4 rounded-xl`}
        // style={{ backgroundColor: movie.color }}
      >
        <button
          onClick={() => navigate(-1)} // ← vuelve a la página anterior
          tabIndex={0}
          className="absolute top-5 left-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          aria-label="Volver al inicio"
        >
          ←
        </button>
        <img
          src={movie.poster}
          alt={movie.title}
          className="poster rounded-xl w-full aspect-[2/3] object-cover border border-white/50"
          style={{ "--poster-color": movie.color } as React.CSSProperties}
        />
        <p className="mt-4 text-xl">{movie.duration}</p>

        <button
          onClick={() => navigate(`/watch/${movie.id}`)}
          tabIndex={0}
          className="boton px-4 text-left font-bold self-start relative w-full mt-4 h-12 border border-white/50 rounded-xl text-white transition"
          style={
            {
              "--boton-bg-color": "rgba(48, 48, 48, 0.8)",
              "--boton-color": movie.color,
            } as React.CSSProperties
          }
        >
          Ver
        </button>
      </div>

      {/* Right column */}
      <div className="flex-1 p-8" style={{ backgroundColor: "" }}>
        <h1 className="text-4xl mb-4 font">{movie.title}</h1>
        <p className="max-w-[80%] whitespace-pre-line sm:text-lg md:text-xl lg:text-2xl">
          {movie.description}
        </p>
        <h5 className="text-2xl mt-6 mb-2">Director: {movie.director}</h5>
      </div>
    </div>
  );
}
