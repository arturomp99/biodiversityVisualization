import * as d3 from "d3";
import {
  barChartParameters,
  graphMargin,
  lineChartParameters,
  timeLineParameters,
} from "../../../../data/constants";
import { axes } from "src/data/idClassNames";

type AxisScaleTypes =
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleBand<string>;

type AxesParametersTypes =
  | typeof lineChartParameters.axesParameters
  | typeof timeLineParameters.axesParameters
  | typeof barChartParameters.axesParameters;

export function createAxes(
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  dimensions: [number, number],
  axesParameters: AxesParametersTypes,
  axesTitles?: [string, string]
) {
  const [xScale, yScale] = scales;
  const [width, height] = dimensions;
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

  const parent = d3.select(parentRef);
  parent.select<SVGSVGElement>("#hAxis").remove();
  parent.select<SVGSVGElement>("#vAxis").remove();
  parent
    .append("g")
    .attr("class", axes.class)
    .attr("id", axes.id.hAxis)
    .call(xAxis)
    .attr(
      "transform",
      `translate(${graphMargin.left},${height + graphMargin.top})`
    );
  parent
    .append("g")
    .attr("class", axes.class)
    .attr("id", axes.id.vAxis)
    .call(yAxis)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);

  if (axesTitles) {
    const [xAxisTitle, yAxisTitle] = axesTitles;
    parent
      .selectAll(`#${axes.id.hAxis}`)
      .append("text")
      .attr("class", axes.title.class)
      .attr("id", axes.title.id.hAxis)
      .attr("text-anchor", axesParameters.title.anchor.hAxis)
      .attr("x", width - graphMargin.right)
      .attr("y", graphMargin.bottom / 2)
      .attr("fill", axesParameters.title.fontColor)
      .attr("font-size", axesParameters.title.fontSize)
      .text(xAxisTitle);
    parent
      .selectAll(`#${axes.id.vAxis}`)
      .append("text")
      .attr("class", axes.title.class)
      .attr("id", axes.title.id.vAxis)
      .attr("text-anchor", axesParameters.title.anchor.vAxis)
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -graphMargin.left / 2)
      .attr("fill", axesParameters.title.fontColor)
      .attr("font-size", axesParameters.title.fontSize)
      .text(yAxisTitle);
  }
}

export const giveSizeToAxes = (
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  dimensions: [number, number],
  axesParameters: AxesParametersTypes
) => {
  const [xScale, yScale] = scales;
  const [width, height] = dimensions;
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

  const parent = d3.select(parentRef);
  parent.select<SVGSVGElement>("#hAxis").call(xAxis);
  parent.select<SVGSVGElement>("#vAxis").call(yAxis);

  parent
    .selectAll("#hAxis")
    .attr(
      "transform",
      `translate(${graphMargin.left},${height + graphMargin.top})`
    );
  parent
    .selectAll("#vAxis")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
  parent
    .selectAll("#xAxisTitle")
    .attr("x", width - graphMargin.right)
    .attr("y", graphMargin.bottom / 2);
  parent
    .selectAll("#yAxisTitle")
    .attr("x", -height / 2)
    .attr("y", -graphMargin.left / 2);
};
