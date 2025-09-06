import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type MultipleSelectDropdownProps = {
  options: Option[];
  selected: string[]; // seleccionados actuales
  onChange: (option: string) => void; // callback cuando se selecciona una opción
  label?: string; // etiqueta opcional para el dropdown
};

export default function MultipleSelectDropdown({
  options,
  selected,
  onChange,
  label,
}: MultipleSelectDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="filtro-genero color-white bg-black border border-white/50 rounded-md p-4">
      <h3 className="text-white mb-3">{label}</h3>
      <div className="relative" data-section="select-dropdown-multiple">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between bg-gray-900 text-white 
                     border border-gray-600 rounded px-3 py-2 cursor-pointer 
                     hover:bg-gray-700"
        >
          <span>
            {selected.length > 0 && selected.length <= 3
              ? selected
                  .map(
                    (val) => options.find((o) => o.value === val)?.label || val
                  )
                  .join(", ")
              : selected.length > 3
              ? `${selected.length} seleccionados`
              : "Seleccionar géneros"}
          </span>

          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {/* Desplegable */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-10 bg-gray-900 border border-gray-600 rounded-b max-h-60 overflow-y-auto">
            <div className="space-y-1 p-2">
              {options.map((option) => (
                <button
                  className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
                  onClick={() => {
                    onChange(option.value);
                  }}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selected.includes(option.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-2">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
