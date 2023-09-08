import * as d3 from "d3";
import { useEffect, useRef } from "react";

export const useLineChartScales = () => {
  let scales = [d3.scaleTime().domain([0, 1]), d3.scaleLinear().domain([0, 1])];

  return scales;
};
