import * as d3 from "d3";
import { LineChartDataType } from "./lineChart.types";
import { graphMargin } from "../../../data/constants";

export const drawLines = (
  parentRef: SVGSVGElement | null,
  data: LineChartDataType[]
) => {
  const line = d3
    .line<LineChartDataType>()
    .x((dataPoint) => {
      return dataPoint.scaledX;
    })
    .y((dataPoint) => dataPoint.scaledY);

  d3.select(parentRef)
    .selectAll(".dataLine")
    .data([data])
    .join("path")
    .attr("d", line)
    .attr("class", "dataLine")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
};
