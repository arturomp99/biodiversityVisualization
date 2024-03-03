import * as d3 from "d3";
import { BarChartDataType, BarChartPointType } from "./BarChart.types";

type BarChartScalesType = [
  d3.ScaleLinear<number, number, never>,
  d3.ScaleBand<string>
];

type ScalingFunctionType = (data: BarChartDataType[]) => BarChartPointType[];

const getScales = (
  data: NonNullable<Parameters<typeof getBarChartScales>[0]>
): BarChartScalesType | undefined => {
  const idValues = data.flatMap((dataPoint) => dataPoint.id);
  const xExtent = [0, d3.max(data, (dataPoint) => dataPoint.count) || 0];

  const xScale = d3.scaleLinear().domain(xExtent);
  const yScale = d3.scaleBand().domain(idValues);

  return [xScale, yScale];
};

const getDataScaling = (
  scales: NonNullable<ReturnType<typeof getScales>>
): ScalingFunctionType => {
  return (data: NonNullable<Parameters<typeof getBarChartScales>[0]>) => {
    const [xScale, yScale] = scales;
    const scaledData = data.map((dataPoint) => {
      return {
        key: dataPoint.id,
        scaledX: xScale(dataPoint.count),
        scaledY: yScale(dataPoint.id),
      };
    });
    return scaledData;
  };
};

export const getBarChartScales = (
  data: BarChartDataType[] | undefined,
  dimensions?: [number, number]
):
  | {
      scales: BarChartScalesType;
      scaleData: ScalingFunctionType | (() => undefined);
    }
  | undefined => {
  if (!data) {
    return;
  }

  const scales = getScales(data);
  if (!scales) {
    return;
  }
  const [xScale, yScale] = scales;

  const scaleData =
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : getDataScaling(scales);

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  return { scales: [xScale, yScale], scaleData };
};
