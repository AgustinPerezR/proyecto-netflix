// KeyboardNavigationSerie.tsx
import { useEffect, useRef, useState } from "react";

// Devuelve todos los elementos focusables de una sección
function getFocusableElementsInSection(section: string) {
  const containers = document.querySelectorAll<HTMLElement>(
    `[data-section='${section}']`
  );
  const elements: HTMLElement[] = [];
  containers.forEach((container) =>
    elements.push(
      ...Array.from(container.querySelectorAll<HTMLElement>("[tabindex='0']"))
    )
  );
  return elements;
}

// Devuelve nombres únicos de secciones
function getSectionNames() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
  const names = Array.from(nodes)
    .map((node) => node.getAttribute("data-section"))
    .filter((name) => name !== "side-bar") // Excluir side-bar
    .filter(Boolean);
  return Array.from(new Set(names)) as string[];
}

export default function KeyboardNavigationSerie() {
  const [sections, setSections] = useState<string[]>([]);
  const currentSectionRef = useRef("back");
  const sectionIndexRef = useRef(1); // índice de la sección actual
  const indexRef = useRef(0); // índice dentro de la sección actual
  const indexSeasonSelected = useRef(0);

  // Actualiza secciones dinámicamente
  useEffect(() => {
    // Función para actualizar las secciones
    const updateSections = () => {
      const detectedSections = getSectionNames();
      setSections(detectedSections);
      // if (!detectedSections.includes(currentSectionRef.current)) {
      //   currentSectionRef.current = detectedSections[0] || "";
      // }
    };

    // Detecta al montar
    updateSections();

    if (sections.length <= 1) {
      sectionIndexRef.current = 0;
      // currentSectionRef.current = sections[0] || "";
    }
    // Observa cambios en el DOM
    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const focus = (section: string, index: number) => {
      const elements = getFocusableElementsInSection(section);
      if (!elements || elements.length === 0) return;

      const validIndex = Math.min(index, elements.length - 1);
      const el = elements[validIndex];
      if (!el) return;

      el.focus();
      indexRef.current = validIndex;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const section = sections[sectionIndexRef.current];
      const elements = getFocusableElementsInSection(section);
      if (!elements || elements.length === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          if (sectionIndexRef.current < sections.length - 1) {
            sectionIndexRef.current++;
            const newSection = sections[sectionIndexRef.current];
            // currentSectionRef.current = newSection;
            indexRef.current =
              newSection === "seasons" ? indexSeasonSelected.current : 0;
            focus(newSection, indexRef.current);
          }
          break;
        }
        case "ArrowUp": {
          if (sectionIndexRef.current > 0) {
            sectionIndexRef.current--;
            const newSection = sections[sectionIndexRef.current];
            // currentSectionRef.current = newSection;

            indexRef.current =
              newSection === "seasons" ? indexSeasonSelected.current : 0;
            focus(newSection, indexRef.current);
          }
          break;
        }
        case "ArrowLeft": {
          indexRef.current = Math.max(indexRef.current - 1, 0);
          if (section === "seasons")
            indexSeasonSelected.current = indexRef.current;
          focus(section, indexRef.current);
          break;
        }
        case "ArrowRight": {
          indexRef.current = Math.min(
            indexRef.current + 1,
            elements.length - 1
          );
          if (section === "seasons")
            indexSeasonSelected.current = indexRef.current;
          focus(section, indexRef.current);
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (section === "seasons") {
            sectionIndexRef.current++;
            indexRef.current = 0; // todo: ir al último capítulo visto
            focus(sections[sectionIndexRef.current], indexRef.current);
          } else {
            elements[indexRef.current]?.click();
          }
          break;
        }
      }
    };

    // Foco inicial seguro
    focus(sections[sectionIndexRef.current], indexRef.current);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sections]);

  return null;
}
