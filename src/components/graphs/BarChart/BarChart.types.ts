import { GraphProps } from "../graphs.types";

export type BarChartDataType = {
  id: string;
  count: number;
};

export type BarChartProps = GraphProps & {
  data: BarChartDataType[];
};

export type BarChartPointType = {
  key: string;
  scaledX?: number;
  scaledY?: number;
};
