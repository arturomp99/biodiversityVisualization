import * as d3 from "d3";
import { barChartParameters, graphMargin } from "../../../data/constants";
import { BarChartPointType } from "./BarChart.types";

export const drawBars = (
  parentRef: SVGSVGElement | null,
  data: BarChartPointType[]
) => {
  d3.select(parentRef)
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("y", (dataPoint) => dataPoint.scaledY ?? 0)
    .attr("width", (dataPoint) => dataPoint.scaledX ?? 0)
    .attr("height", barChartParameters.barWidth)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
  // TODO: Include CONSTANTS edge rounding, stroke none, fill color scale, add margin
};
