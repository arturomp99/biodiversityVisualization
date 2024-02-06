type ZoomHandlersNames = "handleZoomEnd";

export type ZoomHandlersType = Record<
  ZoomHandlersNames,
  (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => void
>;
