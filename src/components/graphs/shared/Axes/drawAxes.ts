import * as d3 from "d3";
import {
  graphMargin,
  lineChartParameters,
  resizeTransitionDuration,
  timeLineParameters,
} from "../../../../data/constants";

type AxisScaleTypes =
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleBand<string>;

type AxesParametersTypes =
  | typeof lineChartParameters.axesParameters
  | typeof timeLineParameters.axesParameters;

const getDimensionsWithoutMargin = (dimensions: [number, number]) => {
  const realDimensions = [
    dimensions[0] - graphMargin.left - graphMargin.right,
    dimensions[1] - graphMargin.top - graphMargin.bottom,
  ];
  return realDimensions;
};

export function createAxes(
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  dimensions: [number, number],
  axesParameters: AxesParametersTypes
) {
  const [xScale, yScale] = scales;
  const [width, height] = getDimensionsWithoutMargin(dimensions);
  xScale.range([0, width]);
  yScale.range([0, height]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xAxis = d3.axisBottom(xScale as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yAxis = d3.axisLeft(yScale as any);

  if (axesParameters?.ticks) {
    xAxis.ticks(axesParameters.ticks.x);
    yAxis.ticks(axesParameters?.ticks.y);
  }

  if (axesParameters?.grid) {
    xAxis.tickSize(-height);
    yAxis.tickSize(-width);
  }

  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "hAxis")
    .call(xAxis)
    .attr(
      "transform",
      `translate(${graphMargin.left},${height + graphMargin.top})`
    );
  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "vAxis")
    .call(yAxis)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
}

export const giveSizeToAxes = (
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  dimensions: [number, number],
  axesParameters: AxesParametersTypes
) => {
  const [xScale, yScale] = scales;
  const [width, height] = getDimensionsWithoutMargin(dimensions);
  xScale.range([0, width]);
  yScale.range([0, height]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xAxis = d3.axisBottom(xScale as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yAxis = d3.axisLeft(yScale as any);

  if (axesParameters?.ticks) {
    xAxis.ticks(axesParameters.ticks.x);
    yAxis.ticks(axesParameters?.ticks.y);
  }

  if (axesParameters?.grid) {
    xAxis.tickSize(-height);
    yAxis.tickSize(-width);
  }

  d3.select(parentRef)
    .select<SVGSVGElement>("#hAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .call(xAxis);
  d3.select(parentRef)
    .select<SVGSVGElement>("#vAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .call(yAxis);

  d3.selectAll("#hAxis").attr(
    "transform",
    `translate(${graphMargin.left},${height + graphMargin.top})`
  );
  d3.selectAll("#vAxis").attr(
    "transform",
    `translate(${graphMargin.left},${graphMargin.top})`
  );
};
