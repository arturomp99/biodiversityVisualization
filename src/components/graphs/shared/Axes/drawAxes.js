import * as d3 from "d3";

export const drawAxes = (parentRef, xScale, yScale) => {
  let parent = d3.select(parentRef);

  const width = parent.node().getBoundingClientRect().width;
  const height = parent.node().getBoundingClientRect().height;

  xScale.range([0, width]);
  yScale.range([0, height]);

  const xAxis = d3.axisBottom(xScale).ticks(4);
  parent
    .append("g")
    .attr("id", "hAxis")
    .call(xAxis)
    .append("text")
    .text("Time (s)");
};
