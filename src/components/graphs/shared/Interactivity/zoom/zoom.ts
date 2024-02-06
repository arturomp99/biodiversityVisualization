import * as d3 from "d3";
import { ZoomHandlersType } from "./zoom.types";

export const addZoom = (
  svg: SVGSVGElement,
  zoomContainer: SVGSVGElement,
  extent: [number, number],
  zoomHandlers?: ZoomHandlersType
) => {
  const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    d3.select(zoomContainer).attr("transform", event.transform.toString());
  };

  const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent(extent);

  zoom.on("zoom", handleZoom);
  !!zoomHandlers?.handleZoomEnd && zoom.on("end", zoomHandlers?.handleZoomEnd);

  d3.select(svg).call(zoom);
};
