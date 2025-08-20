import { useEffect, useRef } from "react";

// funcion para obtener los elementos focusables de una sección
function getFocusableElements() {
  return Array.from(document.querySelectorAll<HTMLElement>(`[tabindex='0']`));
}

export default function KeyboardNavigationMovie() {
  const indexRef = useRef(0);

  useEffect(() => {
    const buttons = getFocusableElements();
    const focus = (index: number) => {
      console.log("Focusable buttons:", buttons);
      buttons.forEach((btn) => btn.blur());
      if (buttons[index]) {
        buttons[index].focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const buttons = getFocusableElements();
      if (buttons.length === 0) return;

      if (e.key === "ArrowRight") {
        // indexRef.current = Math.min(indexRef.current + 1, buttons.length - 1);
        // focus(indexRef.current);
      }

      if (e.key === "ArrowLeft") {
        // indexRef.current = Math.max(indexRef.current - 1, 0);
        // focus(indexRef.current);
      }

      if (e.key === "Enter") {
        e.preventDefault(); // evita el comportamiento nativo del Enter

        console.log("Enter pressed on index:", indexRef.current);
        buttons[indexRef.current]?.click();
      }
      if (e.key === "ArrowDown") {
        indexRef.current = Math.min(indexRef.current + 1, buttons.length - 1);
        focus(indexRef.current);
      }
      if (e.key === "ArrowUp") {
        indexRef.current = Math.max(indexRef.current - 1, 0);
        focus(indexRef.current);
      }
    };

    focus(indexRef.current);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
