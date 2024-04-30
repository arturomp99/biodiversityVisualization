import * as d3 from "d3";
import {
  barChartParameters,
  dendrogramParameters,
  lineChartParameters,
  timeLineParameters,
} from "../../../../data/constants";
import { axes } from "src/data/idClassNames";
import { getGraphMargins } from "src/utils/getGraphMargins";

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
  axesTitles?: [string, string],
  customMargin?: Parameters<typeof getGraphMargins>[0],
  isXLabelDiagonal?: boolean
) {
  const margins = getGraphMargins(customMargin);
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
    .attr("transform", `translate(${margins.left},${height + margins.top})`)
    .style("pointer-events", "none");
  parent
    .append("g")
    .attr("class", axes.class)
    .attr("id", axes.id.vAxis)
    .call(yAxis)
    .attr("transform", `translate(${margins.left},${margins.top})`)
    .style("pointer-events", "none");

  if (axesTitles) {
    const [xAxisTitle, yAxisTitle] = axesTitles;
    parent
      .selectAll(`#${axes.id.hAxis}`)
      .append("text")
      .attr("class", axes.title.class)
      .attr("id", axes.title.id.hAxis)
      .attr("text-anchor", axesParameters.title.anchor.hAxis)
      .attr("x", width - margins.right)
      .attr("y", margins.bottom / 2)
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
      .attr("y", -margins.left / 2)
      .attr("fill", axesParameters.title.fontColor)
      .attr("font-size", axesParameters.title.fontSize)
      .text(yAxisTitle);
  }
  if (isXLabelDiagonal) {
    parent
      .select("#hAxis")
      .selectAll(".tick")
      .select("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)");
  }
}

export const giveSizeToAxes = (
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  dimensions: [number, number],
  axesParameters: AxesParametersTypes,
  customMargin?: Parameters<typeof getGraphMargins>[0]
) => {
  const margins = getGraphMargins(customMargin);
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
  parent
    .select<SVGSVGElement>("#vAxis")
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .call(yAxis);

  parent
    .selectAll("#hAxis")
    .attr("transform", `translate(${margins.left},${height + margins.top})`);
  parent
    .selectAll("#vAxis")
    .attr("transform", `translate(${margins.left},${margins.top})`);
  parent
    .selectAll(`#${axes.id.hAxis}`)
    .selectChild(`.${axes.title.class}`)
    .attr("x", width - margins.right)
    .attr("y", (2 * margins.bottom) / 3);
  parent
    .selectAll(`#${axes.id.vAxis}`)
    .selectChild(`.${axes.title.class}`)
    .attr("x", -height / 2)
    .attr("y", (-2 * margins.left) / 3);
};
