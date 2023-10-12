import * as d3 from "d3";
import { graphMargin } from "../../../data/constants";

export const createLines = (parentRef, data) => {
  console.log("parentRef", d3.select(parentRef), "data", data);
  d3.select(parentRef).append("path").datum(data).attr("fill", "none");
  console.log("data", data);
};
