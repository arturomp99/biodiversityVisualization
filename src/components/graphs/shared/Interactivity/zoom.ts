import * as d3 from "d3";
import { dendrogramParameters } from "src/data/constants";

export const addZoom = (svg: SVGSVGElement, zoomContainer: SVGSVGElement) => {
  const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    return d3
      .select(zoomContainer)
      .attr("transform", event.transform.toString());
  };

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([dendrogramParameters.zoom.min, dendrogramParameters.zoom.max])
    .on("zoom", handleZoom);

  d3.select(svg).call(zoom);
};
