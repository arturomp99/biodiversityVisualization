export type TemporalDataType = {
  species: string | string[];
  // species?: string;
  // start_time: string;
  // finish_time: string;
  eventDate: string | string[];
};

export interface TimeLineChartDataType {
  key: string;
  scaledX: number;
  scaledY: number;
  width: number;
  // function to get the marker height as a function of the total graph height
  getHeight: (graphHeight: number) => number;
}
