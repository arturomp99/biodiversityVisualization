import { ScaleOrdinal, ScaleSequential } from "d3";

export type LegendProps = {
  keys: string[];
  colorScale:
    | ScaleOrdinal<string, string, never>
    | ScaleSequential<string, never>;
  interactivity?: Record<
    LegendInteractionHandlers,
    (event: MouseEvent) => void
  >;
  filterable?: boolean;
};

type LegendInteractionHandlers =
  | "clickHandler"
  | "mouseOverHandler"
  | "mouseOutHandler";
