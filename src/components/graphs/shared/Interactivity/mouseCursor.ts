import * as d3 from "d3";

// Vertical and Horizontal lines follow the mouse
const addLines = (
  node: SVGSVGElement,
  point: [number, number],
  noHorizontal?: boolean,
  noVertical?: boolean
) => {
  !noHorizontal &&
    d3
      .select(node)
      .append("line")
      .attr("class", "cursor-line-hor")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("stroke-opacity", "0.5")
      .attr("y2", node.getBBox().height)
      .attr("transform", `translate(${point[0]},0)`)
      .style("pointer-events", "none");
  !noVertical &&
    d3
      .select(node)
      .append("line")
      .attr("class", "cursor-line-vert")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("stroke-opacity", "0.5")
      .attr("x2", node.getBBox().width)
      .attr("transform", `translate(0,${point[1]})`)
      .style("pointer-events", "none");
};

const moveLines = (
  node: SVGSVGElement,
  point: [number, number],
  noHorizontal?: boolean,
  noVertical?: boolean
) => {
  !noHorizontal &&
    d3
      .select(node)
      .select(".cursor-line-hor")
      .attr("transform", `translate(${point[0]},0)`);
  !noVertical &&
    d3
      .select(node)
      .select(".cursor-line-vert")
      .attr("transform", `translate(0,${point[1]})`);
};

const removeLines = (
  node: SVGSVGElement,
  noHorizontal?: boolean,
  noVertical?: boolean
) => {
  !noHorizontal && d3.select(node).select(".cursor-line-hor").remove();
  !noVertical && d3.select(node).select(".cursor-line-vert").remove();
};

export const mouseCursor = (
  node: SVGSVGElement,
  noHorizontal?: boolean,
  noVertical?: boolean
) => {
  d3.select(node)
    .on("mouseover", function (event) {
      addLines(this, d3.pointer(event), noHorizontal, noVertical);
    })
    .on("mousemove", function (event) {
      moveLines(this, d3.pointer(event), noHorizontal, noVertical);
    })
    .on("mouseout", function () {
      removeLines(this, noHorizontal, noVertical);
    });
};
