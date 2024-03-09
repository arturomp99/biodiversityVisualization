import { useState, useCallback } from "react";
import * as d3 from "d3";

export const useLineChartBrushInteractivity = () => {
  const [brushExtent, setBrushExtent] = useState<
    d3.BrushSelection | undefined
  >();

  const lineChartBrushInteractivity = useCallback(
    (event: d3.D3BrushEvent<unknown>) => {
      setBrushExtent(event.selection || undefined);
    },
    []
  );

  return {
    brushExtent: brushExtent as [number, number] | undefined,
    lineChartBrushInteractivity,
  };
};
