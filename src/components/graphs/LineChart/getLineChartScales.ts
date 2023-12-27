import * as d3 from "d3";
import { SoundChartDataType } from "./lineChart.types";
import { lineChartParameters } from "src/data/constants";

export const getLineChartScales = (
  data: SoundChartDataType[] | undefined,
  dimensions?: [number, number]
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

  const xExtent = d3.extent(data, (dataInstance) => dataInstance.timeStamp) as [
    number,
    number
  ];
  const yExtent = d3.extent(data, (dataInstance) => dataInstance.soundMax) as [
    number,
    number
  ];
  const xScale = d3.scaleTime().domain(xExtent);
  const yScale = d3.scaleLinear().domain(yExtent.reverse());

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  const groupedData = d3.groups(data, (dataLine) => dataLine.sensorID);
  const sensorValues = groupedData.map((dataPoint) => dataPoint[0]);
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(sensorValues)
    .range(lineChartParameters.colorScheme);

  return [xScale, yScale, colorScale];
};
