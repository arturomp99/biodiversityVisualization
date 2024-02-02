import * as d3 from "d3";

export const addBrush = (svg: SVGGElement) => {
  const lineChartBrush = d3.brush();
  d3.select(svg).call(lineChartBrush);
};
