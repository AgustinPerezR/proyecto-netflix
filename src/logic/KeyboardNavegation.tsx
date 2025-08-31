// KeyboardNavigation.tsx
import { useEffect, useRef, useState } from "react";

//  Aquí gestionamos la navegación por teclado en la aplicación (cuando se encuentra en el HOME)
// y el foco en los elementos interactivos de las secciones.

// obtiene los nombres de las secciones (excluyendo side-bar)
function getSectionNames() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
  const names = Array.from(nodes)
    .map((node) => node.getAttribute("data-section"))
    .filter((name) => name !== "side-bar")
    .filter(Boolean);
  return Array.from(new Set(names)) as string[];
}

// obtiene los elementos enfocables de una sección específica
function getFocusableElements(section: string) {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      `[data-section='${section}'][tabindex='0']`
    )
  );
}

// funcion para mover el foco a un elemento específico
function focusElement(section: string, index: number) {
  const focusables = getFocusableElements(section);
  const el = focusables[index];
  if (!el) return;

  el.focus();

  if (section === "side-bar") return;

  // 1) Centro horizontal de la card
  el.scrollIntoView({
    behavior: "smooth", // suaviza el scroll
    block: "nearest", // no mueve verticalmente
    inline: "center", // centra horizontalmente el elemento
  });

  // 2) En el siguiente frame (tras finalizar el scroll horizontal),
  //    centramos verticalmente TODO el carrusel.
  const carousel = el.closest<HTMLElement>(".carousel-container");
  if (carousel) {
    // requestAnimationFrame permite esperar al siguiente frame.
    requestAnimationFrame(() => {
      carousel.scrollIntoView({
        behavior: "smooth", // suaviza el scroll
        block: "center", // centra verticalmente el carrusel
      });
    });
  }
}

function restoreScrollAndFocus(
  currentSectionRef: React.RefObject<string>,
  sectionIndexRef: React.RefObject<number>,
  indexRef: React.RefObject<number>
) {
  const savedScroll = sessionStorage.getItem("homeScrollTop");
  const savedSection = sessionStorage.getItem("currentSectionRef");
  const savedSectionIndex = sessionStorage.getItem("sectionIndexRef");
  const savedIndex = sessionStorage.getItem("indexRef");

  if (savedScroll) {
    // todo: quitar si es innecesario
    window.scrollTo(0, parseInt(savedScroll));
  }
  if (savedSection) {
    currentSectionRef.current = savedSection;
    indexRef.current = savedIndex ? parseInt(savedIndex) : 0;
  }
  if (savedSectionIndex) {
    sectionIndexRef.current = Number(savedSectionIndex);
  }
}

export default function KeyboardNavigation() {
  const [sections, setSections] = useState<string[]>([]);
  const currentSectionRef = useRef<string>("");

  const sectionIndexRef = useRef<number>(0);
  const indexRef = useRef<number>(0);
  const lastFocusedIndexPerSection = useRef(new Map<string, number>());

  useEffect(() => {
    // Función para actualizar las secciones
    const updateSections = () => {
      const detectedSections = getSectionNames();
      setSections(detectedSections);
      if (!detectedSections.includes(currentSectionRef.current)) {
        currentSectionRef.current = detectedSections[0] || "";
      }
    };

    // Detecta al montar
    updateSections();

    // Observa cambios en el DOM
    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Restaurar scroll y foco al montar el componente
    restoreScrollAndFocus(currentSectionRef, sectionIndexRef, indexRef);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return; // Espera a que sections esté listo

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const section = currentSectionRef.current;
      const focusables = getFocusableElements(section);

      if (e.key === "ArrowUp") {
        if (sectionIndexRef.current > 0) {
          lastFocusedIndexPerSection.current.set(section, indexRef.current);
          // me muevo a las seccion de arriba
          sectionIndexRef.current--;
          const newSection = sections[sectionIndexRef.current];
          indexRef.current =
            lastFocusedIndexPerSection.current.get(newSection) ?? 0;
          currentSectionRef.current = newSection;
        }
      }

      if (e.key === "ArrowDown") {
        if (sectionIndexRef.current < sections.length - 1) {
          lastFocusedIndexPerSection.current.set(section, indexRef.current);
          // me muevo a las seccion de abajo
          sectionIndexRef.current++;
          const newSection = sections[sectionIndexRef.current];
          indexRef.current =
            lastFocusedIndexPerSection.current.get(newSection) ?? 0;
          currentSectionRef.current = newSection;
        }
      }

      if (e.key === "ArrowLeft") {
        indexRef.current = Math.max(indexRef.current - 1, 0);
      }

      if (e.key === "ArrowRight") {
        indexRef.current = Math.min(
          indexRef.current + 1,
          focusables.length - 1
        );
      }

      if (e.key === "Enter") {
        // gurdamos el scroll y el foco actual
        sessionStorage.setItem("homeScrollTop", String(window.scrollY)); // 🔹 Agregá esta línea
        // console.log("window.scrollY:", window.scrollY);
        // console.log(
        //   "document.documentElement.scrollTop:",
        //   document.documentElement.scrollTop
        // );
        // console.log("document.body.scrollTop:", document.body.scrollTop);
        sessionStorage.setItem("currentSectionRef", currentSectionRef.current);
        sessionStorage.setItem(
          "sectionIndexRef",
          String(sectionIndexRef.current)
        );
        sessionStorage.setItem("indexRef", String(indexRef.current));

        console.log("Guardando en sessionStorage:");

        focusables[indexRef.current]?.click();
      }

      focusElement(currentSectionRef.current, indexRef.current);
    };

    // Foco inicial
    focusElement(currentSectionRef.current, indexRef.current);

    window.addEventListener("keydown", handleKeyDown);

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const section = target.getAttribute("data-section");
      if (section && target.tabIndex === 0) {
        const focusables = getFocusableElements(section);
        const index = focusables.indexOf(target);
        if (index !== -1) {
          currentSectionRef.current = section;
          sectionIndexRef.current = sections.indexOf(section);
          indexRef.current = index;
          lastFocusedIndexPerSection.current.set(section, index);

          // Asegurarse que se centre visualmente al hacer click
          focusElement(section, index);
        }
      }
    };

    window.addEventListener("focusin", handleFocusIn);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("focusin", handleFocusIn);
      // window.removeEventListener("click", handleClick);
    };
  }, [sections]);

  useEffect(() => {
    // Esperamos al siguiente frame para asegurarnos que el DOM está listo
    requestAnimationFrame(() => {
      const section = currentSectionRef.current;
      const index = indexRef.current;
      const focusables = getFocusableElements(section);
      const el = focusables[index];

      if (el) {
        el.focus();
        el.scrollIntoView({
          behavior: "instant", // o "smooth"
          block: "nearest",
          inline: "center",
        });

        const carousel = el.closest<HTMLElement>(".carousel-container");
        if (carousel) {
          requestAnimationFrame(() => {
            carousel.scrollIntoView({
              behavior: "instant", // o "smooth"
              block: "center",
            });
          });
        }
      }
    });
  }, []);

  return null;
}
