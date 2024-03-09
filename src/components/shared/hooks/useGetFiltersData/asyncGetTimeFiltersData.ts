import * as d3 from "d3";
import { LineChartDataType } from "src/components/graphs";

export const asyncGetTimeFiltersData = async (data: LineChartDataType[]) => {
  const dateStrings = data.flatMap((dataPoint) => dataPoint.timeStamp);
  const timeMin = d3.min(
    dateStrings,
    (pointObservation) => new Date(pointObservation)
  );
  const timeMax = d3.max(
    dateStrings,
    (pointObservation) => new Date(pointObservation)
  );

  return [timeMin, timeMax];
};
