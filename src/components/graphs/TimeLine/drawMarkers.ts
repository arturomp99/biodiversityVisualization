import * as d3 from "d3";
import { ScaleOrdinal } from "d3";
import { TimelineChartPointType } from "..";
import { getGraphMargins } from "src/utils/getGraphMargins";
import { timeLineParameters } from "src/data/constants";

export const drawMarkers = (
  parentRef: SVGSVGElement | null,
  data: TimelineChartPointType[],
  totalHeight: number,
  colorScale?: ScaleOrdinal<string, string, never>
) => {
  const margins = getGraphMargins();
  d3.select(parentRef)
    .selectAll(".dataMarker")
    .data(data)
    .join("rect")
    .attr("class", "dataMarker")
    .attr("x", (dataPoint) => dataPoint.scaledX)
    .attr("y", (dataPoint) => dataPoint.scaledY)
    .attr("width", timeLineParameters.markers.width)
    .attr("rx", timeLineParameters.markers.borderRadius)
    .attr("ry", timeLineParameters.markers.borderRadius)
    // .attr("width", (dataPoint) => dataPoint.width) // TODO: Find out best way
    .attr("height", (dataPoint) => dataPoint.getHeight(totalHeight))
    .attr("fill", (dataPoint) =>
      colorScale ? colorScale(dataPoint.group) : "black"
    )
    .attr("transform", `translate(${margins.left},${margins.top})`);
  // TODO: Include CONSTANTS edge rounding, stroke none, fill color scale, add margin
};
