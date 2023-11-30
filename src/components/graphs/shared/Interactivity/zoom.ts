import * as d3 from "d3";

export const addZoom = (
  svg: SVGSVGElement,
  zoomContainer: SVGSVGElement,
  extent: [number, number]
) => {
  const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    return d3
      .select(zoomContainer)
      .attr("transform", event.transform.toString());
  };

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent(extent)
    .on("zoom", handleZoom);

  d3.select(svg).call(zoom);
};
