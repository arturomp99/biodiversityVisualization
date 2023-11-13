import { Point } from "src/utils/lineEquations";

export interface DendrogramProps {
  isBasicInteractive: boolean;
}

export interface TreeDataType {
  name: string;
  children?: TreeDataType[];
  colname?: string;
}

export interface DendrogramChartDataType extends TreeDataType {
  initialPosition: Point;
}
