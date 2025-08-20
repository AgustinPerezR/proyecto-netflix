import Carousel from "./Carousel";
import Card from "./Card";
import { type Media } from "../types";

interface MovieCarouselProps {
  title: string; // Nombre del Carrusel
  movies: Media[]; // Lista de películas (o series) a mostrar necesito (id y poster)
  section: string; // nombre de la sección para el Card. Ejmplo: "popular-movies", "continue-watching", etc.
}

export default function MovieCarousel({
  title,
  movies,
  section,
}: MovieCarouselProps) {
  if (movies.length === 0) return null;

  return (
    <div className="">
      <h3 className="text-white text-xl mb-1">{title}</h3>
      <Carousel>
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <Card section={section} media={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
