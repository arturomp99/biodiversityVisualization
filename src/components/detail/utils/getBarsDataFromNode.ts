import * as d3 from "d3";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import {
  BarChartDataType,
  StackedBarChartDataType,
} from "src/components/graphs/StackedBarChart/BarChart.types";

export const getBarsDataFromNode = (
  node: d3.HierarchyNode<TreeDataType>
): BarChartDataType[] | undefined => {
  const barsData = node.children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.map((child: any) => {
      return {
        id: child.data[0],
        count: child.value || 0,
      };
    })
    .sort((b, a) => b.count - a.count);
  return barsData;
};

export const getStackedBarsDataFromNode = (
  node: d3.HierarchyNode<TreeDataType>
): StackedBarChartDataType[] | undefined => {
  const barsData = node.children
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.map((child: any) => {
      return {
        id: child.data[0],
        count: child.value || 0,
        children:
          getBarsDataFromNode(child as d3.HierarchyNode<TreeDataType>) || [],
      };
    })
    .sort((b, a) => b.count - a.count);
  return barsData;
};
