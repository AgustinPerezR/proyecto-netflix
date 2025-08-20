import CardCategory from "./CardCategory";
const categories: {
  label: string;
  textColor: string;
  hoverBorder: string;
  hoverShadow: string;
}[] = [
  {
    label: "Series",
    textColor: "text-red-400",
    hoverBorder: "hover:shadow-[0_0_20px] hover:border-red-400",
    hoverShadow: "hover:shadow-red-400",
  },
  {
    label: "Películas",
    textColor: "text-sky-400",
    hoverBorder: "hover:shadow-[0_0_20px] hover:border-sky-400",
    hoverShadow: "hover:shadow-sky-400",
  },
  {
    label: "Sagas",
    textColor: "text-purple-400",
    hoverBorder: "hover:shadow-[0_0_20px] hover:border-purple-400",
    hoverShadow: "hover:shadow-purple-400",
  },
  {
    label: "Animación",
    textColor: "text-orange-400",
    hoverBorder: "hover:shadow-[0_0_20px] hover:border-orange-400",
    hoverShadow: "hover:shadow-orange-400",
  },
  {
    label: "?",
    textColor: "text-green-400",
    hoverBorder: "hover:shadow-[0_0_20px] hover:border-green-400",
    hoverShadow: "hover:shadow-green-400",
  },
];

export default function TopMenu() {
  return (
    <div className="px-4 mt-6">
      {/* <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] max-w-screen-xl mx-auto">
        {categories.map(({ label, textColor, hoverBorder, hoverShadow }) => (
          <div
            key={label}
            className={`
      aspect-[16/10] flex items-center justify-center 
      rounded-xl text-base md:text-xl lg:text-3xl font-sans
      border border-white/50
      ${textColor} ${hoverBorder} ${hoverShadow}
      cursor-pointer transition shadow-md hover:shadow-lg
    `}
            style={{
              // backgroundImage:
              //   "url(https://img.freepik.com/fotos-premium/fondo-textura-abstracta-grunge-azul-oscuro_148157-157.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            tabIndex={0} // ← clave para navegación por teclado
            data-section={"top-menu"}
          >
            {label}
          </div>
        ))}
      </div> */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] max-w-screen-xl mx-auto">
        <CardCategory text="Series" color="rgb(239, 68, 68)" />
        <CardCategory
          text="Películas"
          color="rgb(0, 123, 255)"
          path_navigate="/movies"
        />
        <CardCategory text="Sagas" color="rgb(158, 10, 181)" />
        <CardCategory text="Animación" color="rgb(255, 165, 0)" />
        <CardCategory text="?" color="rgba(26, 182, 26, 1)" />
      </div>
    </div>
  );
}
