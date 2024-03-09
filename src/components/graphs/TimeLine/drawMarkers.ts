import * as d3 from "d3";
import { graphMargin } from "../../../data/constants";
import { TimelineChartPointType } from "..";

export const drawMarkers = (
  parentRef: SVGSVGElement | null,
  data: TimelineChartPointType[],
  totalHeight: number
) => {
  d3.select(parentRef)
    .selectAll(".dataMarker")
    .data(data)
    .join("rect")
    .attr("class", "dataMarker")
    .attr("x", (dataPoint) => dataPoint.scaledX)
    .attr("y", (dataPoint) => dataPoint.scaledY)
    .attr("width", (dataPoint) => dataPoint.width)
    .attr("height", (dataPoint) => dataPoint.getHeight(totalHeight))
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
  // TODO: Include CONSTANTS edge rounding, stroke none, fill color scale, add margin
};
