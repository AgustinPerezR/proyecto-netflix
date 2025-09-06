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
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] max-w-screen-xl mx-auto">
        <CardCategory
          text="Series"
          color="rgb(239, 68, 68)"
          path_navigate="/series"
        />
        <CardCategory
          text="Películas"
          color="rgb(0, 123, 255)"
          path_navigate="/movies"
        />
        <CardCategory text="Sagas" color="rgb(158, 10, 181)" />
        <CardCategory
          text="Animación"
          color="rgb(255, 165, 0)"
          path_navigate="/animation"
        />
        <CardCategory text="?" color="rgba(26, 182, 26, 1)" />
      </div>
    </div>
  );
}
