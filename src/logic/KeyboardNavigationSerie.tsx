// KeyboardNavigationSerie.tsx
import { useEffect, useRef } from "react";

// función para obtener TODOS los elementos navegables en la page
function getFocusableElements() {
  return Array.from(document.querySelectorAll<HTMLElement>(`[tabindex='0']`));
}

export default function KeyboardNavigationSerie() {
  const indexRef = useRef(0);
  const currentSection = useRef("button-back");

  useEffect(() => {
    const focus = (index: number) => {
      const buttons = getFocusableElements();
      buttons.forEach((btn) => btn.blur());
      if (buttons[index]) {
        buttons[index].focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const buttons = getFocusableElements();
      if (buttons.length === 0) return;

      if (e.key === "ArrowDown") {
        indexRef.current = Math.min(indexRef.current + 1, buttons.length - 1);
        focus(indexRef.current);
      }
      if (e.key === "ArrowUp") {
        indexRef.current = Math.max(indexRef.current - 1, 0);
        focus(indexRef.current);
      }
      if (e.key === "ArrowLeft") {
        indexRef.current = Math.max(indexRef.current - 1, 0);
        focus(indexRef.current);
      }
      if (e.key === "ArrowRight") {
        indexRef.current = Math.min(indexRef.current + 1, buttons.length - 1);
        focus(indexRef.current);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        buttons[indexRef.current]?.click();
      }
    };

    // inicializa en el primer botón (volver ←)
    focus(indexRef.current);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
