import * as d3 from "d3";
import { lineChartClassNames } from "src/data/idClassNames";
import { LineChartDataType } from "../lineChart.types";
import { lineChartParameters } from "src/data/constants";

export const lineChartLegendMouseOver = (event: MouseEvent) => {
  const selectedSensorID = d3
    .select(event.target as HTMLElement)
    .data() as string[];

  d3.selectAll<SVGPathElement, [string, LineChartDataType[]]>(
    `.${lineChartClassNames.line}`
  ).attr("stroke-opacity", (dataLine) =>
    dataLine[0] === selectedSensorID[0]
      ? 1
      : lineChartParameters.lines.inactiveStrokeOpacity
  );
};

export const lineChartLegendMouseOut = (event: MouseEvent) => {
  d3.select(event.target as HTMLElement).data();

  d3.selectAll<SVGPathElement, [string, LineChartDataType[]]>(
    `.${lineChartClassNames.line}`
  ).attr("stroke-opacity", 1);
};

export const lineChartLegendClick = (event: MouseEvent) => {
  lineChartLegendMouseOver(event);
};
