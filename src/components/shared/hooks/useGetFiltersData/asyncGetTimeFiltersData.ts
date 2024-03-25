import * as d3 from "d3";
import { LineChartDataType } from "src/components/graphs";
import { DataType } from "src/data/data.types";

export type TimeFiltersDataType = {
  data: (Date | undefined)[];
  loading: boolean;
};

export const asyncGetTimeFiltersData = async (
  observationsData: DataType[],
  sensorData?: LineChartDataType[]
) => {
  const observationsDateStrings = observationsData.flatMap(
    (dataPoint) => dataPoint.eventDate
  );

  const sensorDateStrings = sensorData
    ? sensorData.flatMap((dataPoint) => dataPoint.timeStamp)
    : [];

  const dateStrings = [...observationsDateStrings, ...sensorDateStrings];

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
