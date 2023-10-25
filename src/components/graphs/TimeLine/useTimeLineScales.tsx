import { useState, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { TemporalDataType, TimeLineChartDataType } from "./timeLine.types";

export const useTimeLineScales = (data: TemporalDataType[] | undefined) => {
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

  const scaleData = useCallback(
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : (data: TemporalDataType[]) => {
          const scaledData = data.map(
            (dataPoint: TemporalDataType): TimeLineChartDataType => {
              console.log("xScale", xScale.domain());
              console.log("yScale", yScale.domain());
              const scaledX = xScale(new Date(dataPoint.start_time));
              const scaledY = yScale(dataPoint.name);
              const width =
                xScale(new Date(dataPoint.finish_time)) -
                xScale(new Date(dataPoint.start_time));
              const getHeight = (height: number) =>
                height / yScale.domain().length;
              return {
                key: dataPoint.name,
                scaledX,
                scaledY: scaledY || 0,
                width,
                getHeight,
              };
            }
          );
          return scaledData;
        },
    [xScale.domain()]
  );
  console.log(scaleData);
  return { scales: [xScale, yScale], scaleData };
};
