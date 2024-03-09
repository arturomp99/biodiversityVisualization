import * as d3 from "d3";
import { SoundChartDataType } from "src/components/graphs/LineChart/lineChart.types";

export const asyncGetTimeFiltersData = async (data: SoundChartDataType[]) => {
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
