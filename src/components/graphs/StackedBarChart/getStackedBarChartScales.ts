import * as d3 from "d3";
import {
  StackedBarChartDataType,
  StackedBarChartPointType,
} from "./BarChart.types";

type BarChartScalesType = {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleBand<string>;
  colorScale: d3.ScaleOrdinal<string, string>;
};

type ScalingFunctionType = (
  data: StackedBarChartDataType[]
) => StackedBarChartPointType[];

const getStack = (
  data: NonNullable<Parameters<typeof getStackedBarChartScales>[0]>
) => {
  return d3
    .stack<StackedBarChartDataType>()
    .keys(
      d3.union(
        data.flatMap((dataObject) =>
          dataObject.children.map((dataObjectChild) => dataObjectChild.id)
        )
      )
    )
    .value((group, key) => {
      const child = group.children.find((child) => child.id === key);
      return child ? child.count : 0; // Return count if child exists, otherwise 0
    });
};

const getScales = (
  data: NonNullable<Parameters<typeof getStackedBarChartScales>[0]>
): BarChartScalesType | undefined => {
  const idValues = data.map((dataPoint) => dataPoint.id);
  const xExtent = [0, d3.max(data, (dataPoint) => dataPoint.count) || 0];
  const colorExtent = data.flatMap((dataObject) =>
    dataObject.children.map((dataObjectChild) => dataObjectChild.id)
  );

  const xScale = d3.scaleLinear().domain(xExtent);
  const yScale = d3.scaleBand().domain(idValues);
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(colorExtent)
    .range(d3.schemePaired);

  return { xScale, yScale, colorScale };
};

const getDataScaling = (
  scales: NonNullable<ReturnType<typeof getScales>>
): ScalingFunctionType => {
  const scalingFunction = (
    data: NonNullable<Parameters<typeof getStackedBarChartScales>[0]>
  ) => {
    const stack = getStack(data);
    const stackedData = stack(data);
    const { xScale, yScale, colorScale } = scales;
    const scaledData = stackedData.flatMap((stackedRect) => {
      const scaledStackedRect = stackedRect.map((stackedRectPerBar) => {
        const barLength = stackedRectPerBar[1] - stackedRectPerBar[0];

        return {
          key: `${stackedRectPerBar.data.id}-${stackedRect.key}`,
          id: stackedRect.key,
          parentBarId: stackedRectPerBar.data.id,
          scaledX: xScale(stackedRectPerBar[0]),
          scaledY: yScale(stackedRectPerBar.data.id),
          scaledLength: xScale(barLength),
          color: colorScale(stackedRect.key),
        };
      });
      return scaledStackedRect;
    });
    return scaledData.filter((scaledPoint) => !!scaledPoint.scaledLength);
  };

  return scalingFunction;
};

export const getStackedBarChartScales = (
  data: StackedBarChartDataType[] | undefined,
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
  const { xScale, yScale, colorScale } = scales;
  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }
  const scaleData =
    !xScale.domain().length ||
    !yScale.domain().length ||
    !colorScale.domain().length
      ? () => undefined
      : getDataScaling({ xScale, yScale, colorScale });

  return { scales: { xScale, yScale }, scaleData };
};
