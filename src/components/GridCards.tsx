// GridCards.tsx
import type { Media } from "../types";
import Card from "./Card";
//  este componente se encarga de mostrar las tarjetas de las películas en un formato de cuadrícula

export default function GridCards({ media }: { media: Media[] }) {
  return (
    <div
      className="mx-8 mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]
                 gap-2"
    >
      {media.map((m) => (
        <Card key={m.id} media={m} section="grid" />
      ))}
    </div>
  );
}
