import { hierarchy } from "d3";
import { useEffect, useState } from "react";
import { StackedBarChartDataType } from "src/components/graphs";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { useDataContext } from "src/contexts/dataContext";

export const useGetBarChartData = () => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();
  const [barChartData, setBarChartData] = useState<StackedBarChartDataType[]>();

  const [node, setNode] = useState<
    d3.HierarchyNode<TreeDataType> | undefined
  >();

  useEffect(() => {
    if (!data) {
      return;
    }
    setNode(() => {
      const root = hierarchy<TreeDataType>(data);
      root.count();
      return root;
    });
  }, [data]);

  return { node, setNode, barChartData, setBarChartData, loading };
};
