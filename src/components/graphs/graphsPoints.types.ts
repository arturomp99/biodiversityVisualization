export interface LineChartPointType {
  key: number;
  scaledX: number;
  scaledY: number;
  id: string;
}

export interface TimelineChartPointType {
  key: string;
  scaledX: number;
  scaledY: number;
  width: number;
  group: string;
  // function to get the marker height as a function of the total graph height
  getHeight: (graphHeight: number) => number;
}

export type BarChartPointType = {
  key: string;
  id?: string;
  scaledX?: number;
  scaledY?: number;
};

export type StackedBarChartPointType = BarChartPointType & {
  parentBarId?: string;
  scaledLength: number;
  color: string;
};

export type HistogramPointType = {
  scaledX0: number | null;
  scaledX1: number | null;
  scaledY0: number;
  scaledY1: number;
};
