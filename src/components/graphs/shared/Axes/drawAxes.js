import * as d3 from "d3";

export const createAxes = (parentRef, xScale, yScale) => {
  const xAxis = d3.axisBottom(xScale).ticks(4);
  d3.select(parentRef)
    .append("g")
    .attr("class", "axis")
    .attr("id", "hAxis")
    .call(xAxis)
    .append("text")
    .text("Time (s)");
};

export const giveSizeToAxes = (parentRef, xScale, yScale, width, height) => {
  xScale.range([0, width]);
  yScale.range([0, height]);
  const xAxis = d3.axisBottom(xScale).ticks(4);
  console.log(d3.select(parentRef).select(".axis").call(xAxis));
};
