import Card from "./Card";
import { useRef, useState } from "react";
import Carousel from "./Carousel.tsx";
import { backgroundImage } from "flowbite-react/plugin/tailwindcss/theme";
import { movies } from "../movies"; // Asegurate de que movies sea una exportación nombrada

export default function RecentlyAdded() {
  return (
    <Carousel>
      {movies
        .filter((movie) => movie.group?.split(" ").includes("recently-added"))
        .map((movie) => (
          <Card key={movie.id} section="recently-added" media={movie} />
        ))}
    </Carousel>
  );
}
