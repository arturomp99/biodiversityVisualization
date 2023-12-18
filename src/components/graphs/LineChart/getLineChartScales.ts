import * as d3 from "d3";
import { SoundChartDataType } from "./lineChart.types";
import { getDimensionsWithoutMargin } from "../shared/Axes/drawAxes";

export const getLineChartScales = (
  data: SoundChartDataType[] | undefined,
  dimensions?: [number, number]
) => {
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
    const [width, height] = getDimensionsWithoutMargin(dimensions);
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  return [xScale, yScale];
};
