import { Point } from "src/utils/lineEquations";
import { GraphProps } from "../graphs.types";

export interface TreeDataType {
  name: string;
  children?: TreeDataType[];
  colname?: string;
}

export interface DendrogramChartDataType extends TreeDataType {
  initialPosition: Point;
}
