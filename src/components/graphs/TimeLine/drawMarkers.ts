import * as d3 from "d3";
import { TimelineChartPointType } from "..";
import { getGraphMargins } from "src/utils/getGraphMargins";

export const drawMarkers = (
  parentRef: SVGSVGElement | null,
  data: TimelineChartPointType[],
  totalHeight: number
) => {
  const margins = getGraphMargins();
  d3.select(parentRef)
    .selectAll(".dataMarker")
    .data(data)
    .join("rect")
    .attr("class", "dataMarker")
    .attr("x", (dataPoint) => dataPoint.scaledX)
    .attr("y", (dataPoint) => dataPoint.scaledY)
    .attr("width", (dataPoint) => dataPoint.width)
    .attr("height", (dataPoint) => dataPoint.getHeight(totalHeight))
    .attr("transform", `translate(${margins.left},${margins.top})`);
  // TODO: Include CONSTANTS edge rounding, stroke none, fill color scale, add margin
};
