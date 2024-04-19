export const getMarkerPopup = (
  observationsNum: number,
  detectedSpeciesNum?: number,
  ctaClickCallback?: () => void
) => {
  const container = document.createElement("div");
  container.classList.add(...["flex-col", "gap-1", "items-center"]);

  const label = document.createElement("p");
  label.textContent = `${observationsNum ?? "-"} detections`;

  const sublabel = document.createElement("p");
  sublabel.textContent = `${detectedSpeciesNum} identified species`;

  const button = document.createElement("button");
  if (ctaClickCallback) {
    button.onclick = () => ctaClickCallback();
  }
  button.textContent = "Get list of species";
  const classString =
    "z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium bg-transparent px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none border-success hover:!text-success-foreground hover:!bg-success text-black";
  button.classList.add(...classString.split(/\s+/));

  container.appendChild(label);
  detectedSpeciesNum && container.appendChild(sublabel);
  ctaClickCallback && detectedSpeciesNum && container.appendChild(button);

  return container;
};
