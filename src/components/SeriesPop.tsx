import Card from "./Card";
import { useRef, useState } from "react";
import Carousel from "./Carousel.tsx";
import { series } from "../series"; // Asegurate de que series sea una exportación nombrada

export default function SeriesPop() {
  return (
    <Carousel>
      {series.map((serie, i) => (
        <Card
          key={i}
          section="popular-series"
          media={{
            id: serie.id,
            title: serie.title,
            poster: serie.poster,
            background: serie.background,
            color: serie.color,
            type: "serie",
            seasons: serie.seasons,
            episodes: serie.episodes,
            creator: serie.creator,
            synopsis: serie.synopsis,
          }}
        />
      ))}
    </Carousel>
  );
}
