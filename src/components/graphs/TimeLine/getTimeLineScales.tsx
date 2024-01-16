import * as d3 from "d3";
import { TemporalDataType, TimeLineChartDataType } from "./timeLine.types";

export const getTimeLineScales = <T extends TemporalDataType[]>(
  data: T | undefined,
  dimensions?: [number, number]
) => {
  if (!data) {
    return;
  }
  const xMin = d3.min(data, (dataPoint) =>
    d3.min(
      dataPoint.eventDate,
      (dataPointObservation) => new Date(dataPointObservation)
    )
  );
  const xMax = d3.max(data, (dataPoint) =>
    d3.max(
      dataPoint.eventDate,
      (dataPointObservation) => new Date(dataPointObservation)
    )
  ); // TODO: Can this be improved? Can it be joined into one function? Can it be abstracted?
  if (!xMin || !xMax) return;
  console.log("xMax before", xMax);
  if (xMax) xMax.setSeconds(xMax.getSeconds() + 30);
  console.log("xMax after", xMax);
  const xExtent = [xMin, xMax];
  console.log("xExtent", xExtent);
  const animalsValues = data.flatMap((dataPoint) => dataPoint.species);
  const xScale = d3.scaleTime().domain(xExtent);
  const yScale = d3.scaleBand().domain(animalsValues);

  const scaleData =
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : <T extends TemporalDataType>(data: T[]) => {
          const scaledData = data.flatMap(
            (dataPoint): TimeLineChartDataType[] => {
              const dataPointDates = dataPoint.eventDate as string[];

              const scaledDataPointObservations = dataPointDates.map(
                (dataPointEventDateString) => {
                  const dataPointEventDate = new Date(dataPointEventDateString);
                  const scaledX = xScale(dataPointEventDate);
                  const scaledY = yScale(dataPoint.species as string);
                  const width =
                    xScale(
                      new Date(dataPointEventDate).setSeconds(
                        dataPointEventDate.getSeconds() + 30
                      )
                    ) - xScale(new Date(dataPointEventDate));
                  const getHeight = (height: number) =>
                    height / yScale.domain().length;
                  return {
                    key: dataPoint.species as string,
                    scaledX,
                    scaledY: scaledY || 0,
                    width,
                    getHeight,
                  };
                }
              );

              return scaledDataPointObservations;
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
