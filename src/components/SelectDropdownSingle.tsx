import { useState } from "react";

type SingleSelectDropdownProps = {
  options: string[];
  selected: string; // seleccionado actual
  onChange: (option: string) => void; // callback cuando se selecciona una opción
  label?: string; // etiqueta opcional para el dropdown
};

export default function SingleSelectDropdown({
  options,
  selected,
  onChange,
  label,
}: SingleSelectDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="color-white bg-black border border-white/50 rounded-md p-4">
      <h3 className="text-white mb-3">{label}</h3>
      <div className="relative" data-section="select-dropdown-single">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 cursor-pointer hover:bg-gray-700"
        >
          <span>{selected}</span>
          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-10 bg-gray-900 border border-gray-600 rounded-b max-h-60 overflow-y-auto">
            <div className="space-y-1 p-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    toggleDropdown();
                  }}
                  className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
