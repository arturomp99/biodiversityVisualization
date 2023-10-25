export interface TemporalDataType {
  name: string;
  start_time: string;
  finish_time: string;
}

export interface TimeLineChartDataType {
  key: string;
  scaledX: number;
  scaledY: number;
  width: number;
  // function to get the marker height as a function of the total graph height
  getHeight: (graphHeight: number) => number;
}
