import { Point } from "src/utils/lineEquations";

export interface TreeDataType {
  name: string;
  children?: TreeDataType[];
  colname?: string;
}

export interface DendrogramChartDataType extends TreeDataType {
  initialPosition: Point;
}
