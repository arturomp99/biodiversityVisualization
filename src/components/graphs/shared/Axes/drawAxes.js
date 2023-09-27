import * as d3 from "d3";
import { graphMargin } from "../../../../data/constants";

export const createAxes = (parentRef, xScale, yScale) => {
  const xAxis = d3.axisBottom(xScale).ticks(4); // TODO: Define the ticks somehow
  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "hAxis")
    .call(xAxis)
    .append("text")
    .text("Time (s)");

  const yAxis = d3.axisLeft(yScale).ticks(4);
  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "vAxis")
    .call(yAxis)
    .append("text")
    .text("__");
};

export const giveSizeToAxes = (parentRef, xScale, yScale, width, height) => {
  xScale.range([0, width]);
  yScale.range([0, height]);

  const xAxis = d3.axisBottom(xScale).ticks(4);
  const yAxis = d3.axisLeft(yScale).tickSize(4);

  d3.select(parentRef).select("#hAxis").call(xAxis);
  d3.select(parentRef).select("#vAxis").call(yAxis);

  d3.selectAll("#hAxis").attr(
    "transform",
    `translate(${graphMargin.left},${height + graphMargin.top})`
  );
  d3.selectAll("#vAxis").attr(
    "transform",
    `translate(${graphMargin.left},${graphMargin.top})`
  );
};
