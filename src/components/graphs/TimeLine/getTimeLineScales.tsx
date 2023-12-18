import * as d3 from "d3";
import { TemporalDataType, TimeLineChartDataType } from "./timeLine.types";

export const getTimeLineScales = (
  data: TemporalDataType[] | undefined,
  dimensions?: [number, number]
) => {
  if (!data) {
    return;
  }
  const xMin = d3.min(data, (dataPoint) => new Date(dataPoint.start_time));
  const xMax = d3.max(data, (dataPoint) => new Date(dataPoint.finish_time));
  if (!xMin || !xMax) return;
  const xExtent = [xMin, xMax];
  const animalsValues = data.map((dataPoint) => dataPoint.name);
  const xScale = d3.scaleTime().domain(xExtent);
  const yScale = d3.scaleBand().domain(animalsValues);

  const scaleData =
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : (data: TemporalDataType[]) => {
          const scaledData = data.map(
            (dataPoint: TemporalDataType): TimeLineChartDataType => {
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
        };

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  return { scales: [xScale, yScale], scaleData };
};
