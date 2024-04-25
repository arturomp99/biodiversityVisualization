import { max, scaleBand, scaleLinear, scaleLog } from "d3";
import type { ScaleLinear, ScaleBand, ScaleLogarithmic } from "d3";
import { BarChartDataType } from "../graphsData.types";
import { BarChartPointType } from "../graphsPoints.types";
import { barChartParameters } from "src/data/constants";

type BarChartScalesType = {
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
  yScaleLog: ScaleLogarithmic<number, number, never>;
};

type ScalingFunctionType = (
  data: BarChartDataType[],
  isLog?: boolean
) => BarChartPointType[];

const getScales = (
  data: BarChartDataType[]
): BarChartScalesType | undefined => {
  const idValues = data.map((dataPoint) => dataPoint.id);
  const yExtent = [0, max(data, (dataPoint) => dataPoint.count) ?? 0].reverse();

  const xScale = scaleBand().domain(idValues);
  const yScale = scaleLinear().domain(yExtent);
  const yScaleLog = scaleLog().domain([yExtent[0] || 1, yExtent[1] || 1]);

  return { xScale, yScale, yScaleLog };
};

const getDataScaling = (
  scales: NonNullable<ReturnType<typeof getScales>>
): ScalingFunctionType => {
  const scalingFunction: ScalingFunctionType = (
    data: NonNullable<Parameters<typeof getBarChartScales>[0]>,
    isLog?: boolean
  ) => {
    const { xScale, yScale, yScaleLog } = scales;
    const scaledData = data.map((dataObservation) => {
      console.log(
        "arturo yScaleLog(dataObservation.count)",
        dataObservation.count,
        yScaleLog(dataObservation.count)
      );
      return {
        key: dataObservation.id,
        id: dataObservation.id,
        scaledX: xScale(dataObservation.id),
        scaledY: isLog
          ? yScaleLog(dataObservation.count)
          : yScale(dataObservation.count),
        scaledHeight: isLog
          ? yScaleLog(1) - yScaleLog(dataObservation.count)
          : yScale(0) - yScale(dataObservation.count),
        scaledWidth:
          xScale.range()[1] / (data.length * barChartParameters.barsGapFactor),
        tooltipContent: { numDetections: dataObservation.count },
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
      scales: Pick<BarChartScalesType, "xScale" | "yScale" | "yScaleLog">;
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
  const { xScale, yScale, yScaleLog } = scales;
  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
    yScaleLog.range([0, height]);
  }
  const scaleData =
    !xScale.domain().length ||
    !yScale.domain().length ||
    !yScaleLog.domain().length
      ? () => undefined
      : getDataScaling({ xScale, yScale, yScaleLog });

  return { scales: { xScale, yScale, yScaleLog }, scaleData };
};
