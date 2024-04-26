import { scaleLinear, type ScaleLinear } from "d3";
import { GaugeChartProps } from "../graphsProps.types";

export const getGaugeChartScales = (
  data: GaugeChartProps["data"] | undefined,
  dimensions?: [number, number]
): ScaleLinear<number, number, never> | undefined => {
  if (!data) {
    return;
  }

  const xScale = scaleLinear().domain([0, 100]);

  if (dimensions) {
    const [width] = dimensions;
    xScale.range([0, width]);
  }

  return xScale;
};
