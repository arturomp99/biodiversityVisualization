import * as d3 from "d3";
import { LineChartDataType } from "./lineChart.types";
import { graphMargin } from "../../../data/constants";
import { lineChartParameters } from "../../../data/constants";

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

  const groupedData = d3.groups(data, (dataLine) => dataLine.id);
  const colors = getColorScheme(groupedData);

  d3.select(parentRef)
    .selectAll(".dataLine")
    .data(groupedData)
    .join("path")
    .attr("d", (dataLine) => line(dataLine[1]))
    .attr("class", "dataLine")
    .attr("fill", "none")
    .attr("stroke", (dataLine) => colors(dataLine[0]))
    .attr("stroke-width", "2px")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
};

const getColorScheme = (data: [string, LineChartDataType[]][]) => {
  const groups = data.map((dataGroup) => dataGroup[0]);
  const colors = d3
    .scaleOrdinal<string>()
    .domain(groups)
    .range(lineChartParameters.colorScheme);
  return colors;
};
