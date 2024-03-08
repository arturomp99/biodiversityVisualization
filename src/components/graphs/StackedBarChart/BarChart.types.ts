import { GraphProps } from "../graphs.types";

export type BarChartDataType = {
  id: string;
  count: number;
};

export type BarChartPointType = {
  key: string;
  id?: string;
  scaledX?: number;
  scaledY?: number;
};

export type StackedBarChartDataType = BarChartDataType & {
  children: BarChartDataType[];
};

export type StackedBarChartPointType = BarChartPointType & {
  parentBarId?: string;
  scaledLength: number;
  color: string;
};

export type BarChartProps = GraphProps & {
  data: BarChartDataType[];
};

export type StackedBarChartProps = GraphProps & {
  data: StackedBarChartDataType[];
  onBarClick: (id?: string) => void;
};
