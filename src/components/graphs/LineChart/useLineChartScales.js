import * as d3 from "d3";
import { useEffect, useRef } from "react";

export const useLineChartScales = (data) => {
  let xScale = d3.scaleTime().domain([0, 10]);
  let yScale = d3.scaleLinear().domain([10, 0]);

  useEffect(() => {
    if (!data) {
      // DEFAULT VALUES
      xScale.domain([0, 10]);
      yScale.domain([10, 0]);
    } else {
      xScale.domain([
        d3.min(data, (dataInstance) => dataInstance.timeStamp),
        d3.max(data, (dataInstance) => dataInstance.timeStamp),
      ]);
      yScale.domain([
        d3.min(data, (dataInstance) => dataInstance.soundMax),
        d3.max(data, (dataInstance) => dataInstance.soundMax),
      ]);
    }
  }, [data]);

  return [xScale, yScale];
};
