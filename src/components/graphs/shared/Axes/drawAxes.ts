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
    .attr("class", "axis")
    .attr("id", "hAxis")
    .call(xAxis)
    .attr(
      "transform",
      `translate(${graphMargin.left},${height + graphMargin.top})`
    )
    .style("z-index", 10);
  parent
    .append("g")
    .attr("class", "axis")
    .attr("id", "vAxis")
    .call(yAxis)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .style("z-index", 10);

  if (axesTitles) {
    const [xAxisTitle, yAxisTitle] = axesTitles;
    parent
      .selectAll("#hAxis")
      .append("text")
      .attr("class", "axisTitle")
      .attr("id", "xAxisTitle")
      .attr("text-anchor", "end")
      .attr("x", width - graphMargin.right)
      .attr("y", graphMargin.bottom / 2)
      .attr("fill", "black")
      .attr("font-size", "1rem")
      .text(xAxisTitle);
    parent
      .selectAll("#vAxis")
      .append("text")
      .attr("class", "axisTitle")
      .attr("id", "yAxisTitle")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -graphMargin.left / 2)
      .attr("fill", "black")
      .attr("font-size", "1rem")
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
  parent
    .select<SVGSVGElement>("#hAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .call(xAxis);
  parent
    .select<SVGSVGElement>("#vAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .call(yAxis);

  parent
    .selectAll("#hAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .attr(
      "transform",
      `translate(${graphMargin.left},${height + graphMargin.top})`
    )
    .style("z-index", 10);
  parent
    .selectAll("#vAxis")
    .transition()
    .duration(resizeTransitionDuration)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`);
  parent
    .selectAll("#xAxisTitle")
    .transition()
    .duration(resizeTransitionDuration)
    .attr("x", width - graphMargin.right)
    .attr("y", graphMargin.bottom / 2)
    .style("z-index", 10);
  parent
    .selectAll("#yAxisTitle")
    .transition()
    .duration(resizeTransitionDuration)
    .attr("x", -height / 2)
    .attr("y", -graphMargin.left / 2);
};
