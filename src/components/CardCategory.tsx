// CardCategory.tsx

// import { backgroundImage } from "flowbite-react/plugin/tailwindcss/theme";
import { useNavigate } from "react-router-dom";

type CardCategoryProps = {
  text: string;
  color: string;
  path_navigate?: string;
};

export default function CardCategory({
  text,
  color,
  path_navigate,
}: CardCategoryProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`card-category
      aspect-[16/10] flex items-center justify-center 
      rounded-xl text-base md:text-xl lg:text-3xl font-sans
      cursor-pointer
    `}
      onClick={() => {
        if (path_navigate) {
          navigate(path_navigate);
        }
      }}
      tabIndex={0}
      data-section={"top-menu"}
      style={{ "--card-color": color } as React.CSSProperties}
    >
      <h3 className="text-lg font-bold mb-2 text-base md:text-xl lg:text-3xl font-sans">
        {text}
      </h3>
    </div>
  );
}
