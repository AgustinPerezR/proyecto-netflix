import { Range, getTrackBackground } from "react-range";

type RangeSliderProps = {
  values: number[];
  min: number;
  max: number;
  step?: number; // esto es el tamaño del salto entre valores
  label?: string;
  onChange?: (values: number[]) => void;
};

export default function RangeSlider({
  values,
  min,
  max,
  step = 1,
  label,
  onChange,
}: RangeSliderProps) {
  return (
    <div data-section="range-slider" data-type="range-slider">
      <h3 className="text-white mb-3">{label}</h3>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={onChange ? onChange : () => {}}
        renderTrack={({ props, children }) => (
          <div
            ref={props.ref}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                colors: ["#69778dff", "#254f7eff", "#69778dff"],
                min,
                max,
              }),
            }}
            className="h-3 w-full rounded-full"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-4 w-4 bg-white rounded-full border border-gray-500"
            // style={{
            //   ...props.style,
            // }}
          />
        )}
      />
      <div className="flex justify-between w-full text-sm mt-2 px-1">
        <span>{values[0]} min</span>
        <span>{values[1]} min</span>
      </div>
    </div>
  );
}
