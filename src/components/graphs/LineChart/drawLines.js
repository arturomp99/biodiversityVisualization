import * as d3 from "d3";
import { graphMargin } from "../../../data/constants";

export const createLines = (parentRef, data) => {
  d3.select(parentRef).append("path").datum(data).attr("fill", "none");
};
