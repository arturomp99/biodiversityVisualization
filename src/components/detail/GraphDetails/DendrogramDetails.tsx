import * as d3 from "d3";
import React, { useCallback, useEffect, useState } from "react";
import { StackedBarChart } from "src/components/graphs/StackedBarChart/StackedBarChart";
import { StyledDetailChart } from "./styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useDataContext } from "src/contexts/dataContext";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { getStackedBarsDataFromNode } from "../utils/getBarsDataFromNode";
import {
  StackedBarChartDataType,
  StackedBarChartProps,
} from "src/components/graphs";

export const DendrogramDetails = () => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();

  const [barChartData, setBarChartData] = useState<StackedBarChartDataType[]>();
  const [node, setNode] = useState<
    d3.HierarchyNode<TreeDataType> | undefined
  >();

  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  useEffect(() => {
    if (!data) {
      return;
    }
    setNode(() => {
      const root = d3.hierarchy<TreeDataType>(data);
      root.count();
      return root;
    });
  }, [data]);

  useEffect(() => {
    if (!node) {
      return;
    }
    setBarChartData(() => getStackedBarsDataFromNode(node));
  }, [node]);

  const onBarClick = useCallback<StackedBarChartProps["onBarClick"]>(
    (clickedNodeKey) => {
      setNode((prevNode) => {
        if (!prevNode?.children) {
          return;
        }
        const clickedNode = prevNode?.children.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (childNode: any) => childNode.data[0] === clickedNodeKey
        );
        return clickedNode;
      });
    },
    []
  );

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {!loading &&
        !!barChartData &&
        renderGraph(
          <StackedBarChart
            dimensions={dimensions ?? [0, 0]}
            isBasicInteractive
            data={barChartData}
            onBarClick={onBarClick}
          />,
          dimensions
        )}
    </StyledDetailChart>
  );
};
