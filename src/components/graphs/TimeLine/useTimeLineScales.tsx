import { useState, useEffect } from "react";
import * as d3 from "d3";
import { TimeLineDataType } from "./timeLine.types";

export const useTimeLineScales = (data: TimeLineDataType[] | undefined) => {
  const [[xScale, yScale], setScales] = useState([
    d3.scaleTime().domain([]),
    d3.scaleBand().domain([]),
  ]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const xMin = d3.min(data, (dataPoint) => new Date(dataPoint.start_time));
    const xMax = d3.max(data, (dataPoint) => new Date(dataPoint.finish_time));
    if (!xMin || !xMax) return;
    const xExtent = [xMin, xMax];
    const animalsValues = data.map((dataPoint) => dataPoint.name);
    setScales(([prevXScale, prevYScale]) => [
      prevXScale.domain(xExtent),
      prevYScale.domain(animalsValues),
    ]);
  }, [data]);

  return [xScale, yScale];
};
