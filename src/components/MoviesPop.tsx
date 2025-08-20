import Card from "./Card";
import { useRef, useState } from "react";
import Carousel from "./Carousel.tsx";
import { movies } from "../movies"; // Asegurate de que movies sea una exportación nombrada
// TODO: recibir las peliculas desde una API o base de datos (backend)

export default function MoviesPop() {
  return (
    <Carousel>
      {movies
        .filter((movie) => movie.group?.split(" ").includes("popular-movies"))
        .map((movie) => (
          <Card key={movie.id} section="popular-movies" media={movie} />
        ))}
    </Carousel>
  );
}
