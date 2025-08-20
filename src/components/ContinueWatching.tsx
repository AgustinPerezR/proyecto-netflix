import Card from "./Card";
import Carousel from "./Carousel.tsx";

import type { Media } from "../types.tsx";
import { movies } from "../movies";
import { series } from "../series";

const continuarViendo: Media[] = [
  // series.find((serie) => serie.title === "Daredevil") as Media,
  series.find((serie) => serie.title === "El Eternauta") as Media,
  // movies.find(
  //   (movie) => movie.title === "Harry Potter 5: and the Order of the Phoenix"
  // ) as Media,
];

export default function ContinueWatching() {
  return (
    <Carousel>
      {continuarViendo.map((media, i) => (
        <Card key={i} section="continue-watching" media={media} />
      ))}
    </Carousel>
  );
}
