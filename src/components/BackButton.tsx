import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div data-section="back">
      <button
        onClick={() => navigate(-1)}
        className="button-back bg-black/50 hover:bg-black/70 text-white p-2 rounded-full w-fit"
        aria-label="Volver al inicio"
        tabIndex={0}
      >
        ←
      </button>
    </div>
  );
}
