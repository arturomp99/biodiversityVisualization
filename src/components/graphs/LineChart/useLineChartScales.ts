import * as d3 from "d3";
import { useEffect, useState } from "react";
import { SoundChartDataType } from "./lineChart.types";

export const useLineChartScales = (data: SoundChartDataType[] | undefined) => {
  const [[xScale, yScale], setScales] = useState([
    d3.scaleTime().domain([0, 10]),
    d3.scaleLinear().domain([10, 0]),
  ]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const xExtent = d3.extent(
      data,
      (dataInstance) => dataInstance.timeStamp
    ) as [number, number];
    const yExtent = d3.extent(
      data,
      (dataInstance) => dataInstance.soundMax
    ) as [number, number];
    setScales(([prevXScale, prevYScale]) => [
      prevXScale.domain(xExtent),
      prevYScale.domain(yExtent.reverse()),
    ]);
  }, [data]);

  return [xScale, yScale];
};
