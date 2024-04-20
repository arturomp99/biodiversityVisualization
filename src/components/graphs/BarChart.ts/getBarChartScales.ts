import { max, scaleBand, scaleLinear } from "d3";
import type { ScaleLinear, ScaleBand } from "d3";
import { BarChartDataType } from "../graphsData.types";
import { BarChartPointType } from "../graphsPoints.types";
import { barChartParameters } from "src/data/constants";

type BarChartScalesType = {
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
};

type ScalingFunctionType = (data: BarChartDataType[]) => BarChartPointType[];

const getScales = (
  data: BarChartDataType[]
): BarChartScalesType | undefined => {
  const idValues = data.map((dataPoint) => dataPoint.id);
  const yExtent = [0, max(data, (dataPoint) => dataPoint.count) ?? 0].reverse();

  const xScale = scaleBand().domain(idValues);
  const yScale = scaleLinear().domain(yExtent);

  return { xScale, yScale };
};

const getDataScaling = (
  scales: NonNullable<ReturnType<typeof getScales>>
): ScalingFunctionType => {
  const scalingFunction = (
    data: NonNullable<Parameters<typeof getBarChartScales>[0]>
  ) => {
    const { xScale, yScale } = scales;
    const scaledData = data.map((dataObservation) => {
      return {
        key: dataObservation.id,
        id: dataObservation.id,
        scaledX: xScale(dataObservation.id),
        scaledY: yScale(dataObservation.count),
        scaledHeight: yScale(0) - yScale(dataObservation.count),
        scaledWidth:
          xScale.range()[1] / (data.length * barChartParameters.barsGapFactor),
      };
    });
    return scaledData;
  };

  return scalingFunction;
};

export const getBarChartScales = (
  data: BarChartDataType[] | undefined,
  dimensions?: [number, number]
):
  | {
      scales: Pick<BarChartScalesType, "xScale" | "yScale">;
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
  const { xScale, yScale } = scales;
  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }
  const scaleData =
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : getDataScaling({ xScale, yScale });

  return { scales: { xScale, yScale }, scaleData };
};
