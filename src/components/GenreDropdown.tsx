import { useRef } from "react";
import { genres } from "../constants";

type GenreDropdownProps = {
  selectedGenres: string[];
  onChange: (value: string) => void;
};

export default function GenreDropdown({
  selectedGenres,
  onChange,
}: GenreDropdownProps) {
  const refs = useRef<(HTMLLabelElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    idx: number,
    genreValue: string
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      refs.current[idx + 1]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      refs.current[idx - 1]?.focus();
    }
    if (e.key === "Enter" || e.key === " ") onChange(genreValue);
  };

  return (
    <div className="relative">
      {genres.map((genre, idx) => (
        <label
          key={genre.value}
          //   ref={(el) => (refs.current[idx] = el)}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, idx, genre.value)}
          className="flex items-center space-x-2 text-white cursor-pointer hover:bg-gray-700 p-1 rounded"
        >
          <input
            type="checkbox"
            value={genre.value}
            checked={selectedGenres.includes(genre.value)}
            onChange={() => onChange(genre.value)}
            className="w-4 h-4"
          />
          <span>{genre.label}</span>
        </label>
      ))}
    </div>
  );
}
