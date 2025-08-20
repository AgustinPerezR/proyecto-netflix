type ButtonProps = {
  episodeNumber: number;
  seasonNumber: number;
  colorSeason?: string;
  // onClick: () => void;
};

export default function ButtonEpisode({
  episodeNumber,
  seasonNumber,
  colorSeason,
}: ButtonProps) {
  const handleClick = () => {
    // Aquí puedes manejar el evento de clic si es necesario
    console.log(
      `Episodio ${episodeNumber} de la temporada ${seasonNumber} clickeado`
    );
  };
  //cuadrado pequeño con el numero del episodio y background del color de la temporada
  return (
    <button
      className="w-10 h-10 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-transform hover:scale-110"
      style={{ backgroundColor: colorSeason }}
      onClick={handleClick}
      tabIndex={0}
    >
      {episodeNumber}
    </button>
  );
}
