import {
  BarChartDataType,
  LineChartDataType,
  StackedBarChartDataType,
} from "./graphsData.types";

export interface GraphProps {
  dimensions: [number, number];
  isBasicInteractive?: boolean;
}

export type LineChartProps = GraphProps & {
  data: LineChartDataType[];
};

export type BarChartProps = GraphProps & {
  data: BarChartDataType[];
};

export type StackedBarChartProps = GraphProps & {
  data: StackedBarChartDataType[];
  onBarClick: (id?: string) => void;
};
