// .KeyNavHomeSection.tsx
import { useEffect } from "react";
import { getSectionNames, handleKeyBoardNav } from "./NavUtils";
// vale para Section Movies, Section Series, Section Sagas, etc

export default function KeyNavHomeSection() {
  useEffect(() => {
    console.log("Secciones en la página:", getSectionNames());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyBoardNav(event, {
        up: () => console.log("Navegar hacia arriba"),
        down: () => console.log("Navegar hacia abajo"),
        left: () => console.log("Navegar hacia la izquierda"),
        right: () => console.log("Navegar hacia la derecha"),
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
