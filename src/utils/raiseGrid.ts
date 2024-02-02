import * as d3 from "d3";
import { axes } from "src/data/idClassNames";

export const raiseGrid = () => {
  d3.selectAll(`.${axes.class}`).raise();
};
