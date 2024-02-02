import * as d3 from "d3";
import { LineChartDataType } from "./lineChart.types";
import { graphMargin, lineChartParameters } from "../../../data/constants";
import { lineChartClassNames } from "src/data/idClassNames";

export const drawLines = (
  parentRef: SVGSVGElement | null,
  data: LineChartDataType[],
  colors: d3.ScaleOrdinal<string, string, never>
) => {
  const line = d3
    .line<LineChartDataType>()
    .x((dataPoint) => {
      return dataPoint.scaledX;
    })
    .y((dataPoint) => dataPoint.scaledY);

  const groupedData = d3.groups(data, (dataLine) => dataLine.id);

  d3.select(parentRef)
    .selectAll(`.${lineChartClassNames.linesGroup}`)
    .data([null])
    .enter()
    .append("g")
    .attr("class", `${lineChartClassNames.linesGroup}`)
    .selectAll(`.${lineChartClassNames.line}`)
    .data(groupedData)
    .join("path")
    .attr("d", (dataLine) => line(dataLine[1]))
    .attr("class", `${lineChartClassNames.line}`)
    .attr("fill", "none")
    .attr("stroke", (dataLine) => colors(dataLine[0]))
    .attr("stroke-width", lineChartParameters.lines.strokeWidth)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .lower();
};
