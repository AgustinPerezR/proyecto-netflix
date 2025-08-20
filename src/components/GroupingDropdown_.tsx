import { groupingOptions } from "../constants";

type GroupingDropdownProps = {
  selected: string;
  onChange: (value: string) => void;
};
export default function GroupingDropdown({
  selected,
  onChange,
}: GroupingDropdownProps) {
  return (
    <div className="relative">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => {}}
      >
        {selected || "Seleccionar agrupamiento"} ▼
      </button>
      <div className="absolute z-10 bg-gray-900 border border-gray-600 rounded-b max-h-60 overflow-y-auto">
        {groupingOptions.map((option) => (
          <button
            key={option.value}
            className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
