import * as d3 from "d3";
import { graphMargin, lineChartParameters } from "../../../data/constants";
import { lineChartClassNames } from "src/data/idClassNames";
import { raiseGrid } from "src/utils/raiseGrid";
import { LineChartPointType } from "../graphsPoints.types";

export const drawLines = (
  parentRef: SVGSVGElement | null,
  data: LineChartPointType[],
  colors: d3.ScaleOrdinal<string, string, never>
) => {
  const line = d3
    .line<LineChartPointType>()
    .x((dataPoint) => {
      return dataPoint.scaledX;
    })
    .y((dataPoint) => dataPoint.scaledY);

  const groupedData = d3.groups(data, (dataLine) => dataLine.id);

  const lineMarkersGroup = d3
    .select(parentRef)
    .selectAll(`.${lineChartClassNames.linesGroup}`)
    .data([groupedData]);
  lineMarkersGroup
    .enter()
    .append("g")
    .attr("class", `${lineChartClassNames.linesGroup}`);

  const lineMarkers = lineMarkersGroup
    .selectAll<SVGPathElement, [string, LineChartPointType[]]>(
      `.${lineChartClassNames.line}`
    )
    .data(
      (data) => data,
      (data) => data[0]
    );
  const lineMarkersEnter = lineMarkers
    .enter()
    .append("path")
    .attr("d", (dataLine) => line(dataLine[1]))
    .attr("class", lineChartClassNames.line)
    .attr("fill", "none")
    .attr("stroke", (dataLine) => colors(dataLine[0]))
    .attr("stroke-width", lineChartParameters.lines.strokeWidth)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
  const lineMarkersUpdate = lineMarkers.attr("d", (dataLine) =>
    line(dataLine[1])
  );
  lineMarkersEnter.merge(lineMarkersUpdate);
  raiseGrid();
};
