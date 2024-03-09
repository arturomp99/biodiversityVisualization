import * as d3 from "d3";
import { lineChartParameters } from "src/data/constants";
import { LineChartDataType } from "../graphsData.types";

export const getLineChartScales = (
  data: LineChartDataType[] | undefined,
  dimensions?: [number, number],
  extent?: { x?: [number, number]; y?: [number, number] }
):
  | [
      d3.ScaleTime<number, number, never>,
      d3.ScaleLinear<number, number, never>,
      d3.ScaleOrdinal<string, string, never>
    ]
  | undefined => {
  if (!data) {
    return;
  }

  const xExtent =
    extent?.x ??
    (d3.extent(data, (dataInstance) => dataInstance.timeStamp) as [
      number,
      number
    ]);
  const yExtent =
    extent?.y ?? lineChartParameters.startAtZero
      ? ([0, d3.max(data, (dataInstance) => dataInstance.value)] as [
          number,
          number
        ])
      : (d3.extent(data, (dataInstance) => dataInstance.value) as [
          number,
          number
        ]);
  const xScale = d3.scaleTime().domain(xExtent);
  const yScale = d3.scaleLinear().domain(yExtent.reverse());

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  const groupedData = d3.groups(data, (dataLine) => dataLine.group);
  const sensorValues = groupedData.map((dataPoint) => dataPoint[0]);
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(sensorValues)
    .range(lineChartParameters.colorScheme);

  return [xScale, yScale, colorScale];
};
