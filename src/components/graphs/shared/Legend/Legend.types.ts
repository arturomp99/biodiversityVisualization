import { ScaleOrdinal } from "d3";

export type LegendProps = {
  keys: string[];
  colorScale: ScaleOrdinal<string, string, never>;
  interactivity?: Record<
    LegendInteractionHandlers,
    (event: MouseEvent) => void
  >;
};

type LegendInteractionHandlers =
  | "clickHandler"
  | "mouseOverHandler"
  | "mouseOutHandler";
