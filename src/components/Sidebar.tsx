import { Search, Home as HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside
      className="w-14 bg-neutral-900 flex flex-col items-center py-4 space-y-4 border-r border-white/20"
      data-section={"side-bar"}
    >
      <button
        className="text-white hover:scale-110 transition-transform"
        onClick={() => navigate("/search")}
      >
        <Search />
      </button>
      <button
        className="text-white hover:scale-110 transition-transform"
        onClick={() => navigate("/")}
      >
        <HomeIcon fill="#a5b4fc" />
      </button>
      <button className="text-white hover:scale-110 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5H4.5"
          />
        </svg>
      </button>
    </aside>
  );
}
