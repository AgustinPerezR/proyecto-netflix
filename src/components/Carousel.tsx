import { useRef } from "react";

type CarouselProps = {
  children: React.ReactNode;
};

export default function Carousel({ children }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Función para manejar el scroll al hacer clic en las flechas
  const scroll = (dir: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({
      left: dir === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-container relative group overflow-hidden">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ◀
      </button>

      <div ref={scrollContainerRef} className="overflow-hidden scroll-smooth">
        <div
          className="flex gap-4 py-5 px-3 bg-black/10 overflow-visible"
          style={{
            minWidth: "max-content",
          }}
        >
          {children}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ▶
      </button>
    </div>
  );
}
