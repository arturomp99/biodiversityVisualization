import { DataType } from "src/data/data.types";

export interface LineChartDataType {
  timeStamp: number;
  value: number;
  group: string;
}

export type MapChartDataType = {
  latitude: number;
  longitude: number;
  Id: string | string[];
  observationsNum: number;
};

export type TimelineChartDataType = {
  species: string | string[];
  // species?: string;
  // start_time: string;
  // finish_time: string;
  eventDate: string | string[];
};

export type BarChartDataType = {
  id: string;
  count: number;
};

export type StackedBarChartDataType = BarChartDataType & {
  children: BarChartDataType[];
};

export type HistogramDataType<T> = Pick<DataType, "eventDate"> & T;
