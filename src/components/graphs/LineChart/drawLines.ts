import * as d3 from "d3";
import { LineChartDataType } from "./lineChart.types";
// import { graphMargin } from "../../../data/constants";

export const drawLines = (
  parentRef: SVGSVGElement | null,
  data: LineChartDataType[]
) => {
  d3.select(parentRef).append("path").datum(data).attr("fill", "none");
};
