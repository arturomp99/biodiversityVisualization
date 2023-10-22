import * as d3 from "d3";
import { graphMargin, lineChartParameters } from "../../../../data/constants";

type AxisScaleTypes =
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLinear<number, number, never>;

export function createAxes(parentRef: SVGSVGElement, scales: AxisScaleTypes[]) {
  const [xScale, yScale] = scales;
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "hAxis")
    .call(xAxis);
  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "vAxis")
    .call(yAxis);
}

export const giveSizeToAxes = (
  parentRef: SVGSVGElement,
  scales: AxisScaleTypes[],
  size: number[],
  axesParameters: typeof lineChartParameters.axesParameters
) => {
  const [xScale, yScale] = scales;
  const [width, height] = size;
  xScale.range([0, width]);
  yScale.range([0, height]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  if (axesParameters?.ticks) {
    xAxis.ticks(axesParameters.ticks.x);
    yAxis.ticks(axesParameters?.ticks.y);
  }

  if (axesParameters?.grid) {
    xAxis.tickSize(-height);
    yAxis.tickSize(-width);
  }

  d3.select(parentRef).select<SVGSVGElement>("#hAxis").call(xAxis);
  d3.select(parentRef).select<SVGSVGElement>("#vAxis").call(yAxis);

  d3.selectAll("#hAxis").attr(
    "transform",
    `translate(${graphMargin.left},${height + graphMargin.top})`
  );
  d3.selectAll("#vAxis").attr(
    "transform",
    `translate(${graphMargin.left},${graphMargin.top})`
  );
};
