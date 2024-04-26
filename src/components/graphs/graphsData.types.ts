import { DataType } from "src/data/data.types";

export interface LineChartDataType {
  timeStamp: number;
  value: number;
  group: string;
}

export type MapChartDataType = {
  latitude: number;
  longitude: number;
  observations?: DataType[];
  observationsNum: number;
};

export type TimelineChartDataType = Omit<DataType, "eventDate"> & {
  species: string;
  class: string;
  // species?: string;
  // start_time: string;
  // finish_time: string;
  eventDate: string;
};

export type BarChartDataType = {
  id: string;
  count: number;
};

export type StackedBarChartDataType = BarChartDataType & {
  children: BarChartDataType[];
};

export type HistogramDataType<T> = Pick<DataType, "eventDate"> & T;

export type NumericHistogramDataType<T> = Omit<
  HistogramDataType<T>,
  "Confidence%"
> & {
  "Confidence%": number;
};
