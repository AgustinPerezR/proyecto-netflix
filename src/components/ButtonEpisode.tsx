import { useNavigate } from "react-router-dom";
type ButtonProps = {
  idSerie: number;
  episodeNumber: number;
  seasonNumber: number;
  colorSeason?: string;
  progress: number; // 0, 50, 100
  onChangeProgress: (newProgress: number) => void;
};

export default function ButtonEpisode({
  idSerie,
  seasonNumber,
  episodeNumber,
  colorSeason,
  progress,
  onChangeProgress,
}: ButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(`Episodio ${episodeNumber} clickeado`);
    navigate(`/watch/serie/${idSerie}/s/${seasonNumber}/e/${episodeNumber}`); // Ajusta la ruta según tu estructura
  };

  const handleSetProgress = (value: number) => {
    onChangeProgress(value);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Botón principal */}
      <button
        className="button-episode w-10 h-10 rounded-full text-white flex items-center justify-center 
        text-xs font-semibold transition-transform hover:scale-110 focus:scale-110 
        relative overflow-hidden"
        onClick={handleClick}
        tabIndex={0}
        style={{
          backgroundColor: `#2228`,
        }}
      >
        {/* Capa de progreso */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: colorSeason,
            zIndex: 1,
            transition: "width 0.3s ease",
          }}
        />
        {/* Texto del número */}
        <span className="relative z-10">{episodeNumber}</span>
      </button>

      {/* Botones para cambiar progreso */}
      <div className="flex gap-1 mt-1 opacity-0 hover:opacity-100 transition">
        <button onClick={() => handleSetProgress(0)} className="text-xs">
          0%
        </button>
        <button onClick={() => handleSetProgress(100)} className="text-xs">
          100%
        </button>
      </div>
    </div>
  );
}
