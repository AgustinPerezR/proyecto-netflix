import Card from "./Card";
import Carousel from "./Carousel.tsx";
import { movies } from "../movies"; // Asegurate de que movies sea una exportación nombrada
// TODO: recibir las peliculas desde una API o base de datos (backend)

export default function MoviesDrama() {
  return (
    <Carousel>
      {movies
        .filter(
          (movie) =>
            movie.group?.split(" ").includes("drama-movies") &&
            movie.genre?.includes("drama")
        )
        .map((movie) => (
          <Card key={movie.id} section="drama-movies" media={movie} />
        ))}
    </Carousel>
  );
}
