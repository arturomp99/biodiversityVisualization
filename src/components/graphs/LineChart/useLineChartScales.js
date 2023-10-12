import * as d3 from "d3";
import { useEffect, useState } from "react";

export const useLineChartScales = (data) => {
  let [[xScale, yScale], setScales] = useState([
    d3.scaleTime().domain([0, 10]),
    d3.scaleLinear().domain([10, 0]),
  ]);

  useEffect(() => {
    if (!data) {
      return;
    }
    let minX = d3.min(data, (dataInstance) => dataInstance.timeStamp);
    let maxX = d3.max(data, (dataInstance) => dataInstance.timeStamp);
    let minY = d3.max(data, (dataInstance) => dataInstance.soundMax);
    let maxY = d3.min(data, (dataInstance) => dataInstance.soundMax);
    setScales(([prevXScale, prevYScale]) => [
      prevXScale.domain([minX, maxX]),
      prevYScale.domain([minY, maxY]),
    ]);
  }, [data]);

  return [xScale, yScale];
};
