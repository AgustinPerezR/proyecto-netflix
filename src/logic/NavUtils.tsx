//  NavUtils.tsx

// Devuelve nombres únicos de secciones en la pagina actual
export const getSectionNames = () => {
  const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
  const names = Array.from(nodes)
    .map((node) => node.getAttribute("data-section"))
    .filter((name) => name !== "side-bar") // Excluir side-bar
    .filter(Boolean);
  return Array.from(new Set(names)) as string[];
};

// Devuelve todos los elementos focusables de una sección específica
export const getFocusableElementsInSection = (section: string) => {
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
};

type KeyBoardKeysProps = {
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
};

export const handleKeyBoardNav = (
  event: KeyboardEvent,
  handlers: KeyBoardKeysProps
) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    handlers.up?.();
  }
};
