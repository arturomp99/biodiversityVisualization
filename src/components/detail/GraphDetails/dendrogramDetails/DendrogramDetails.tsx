import * as d3 from "d3";
import React, { useCallback, useEffect, useState } from "react";
import { StackedBarChart } from "src/components/graphs/StackedBarChart/StackedBarChart";
import { StyledDetailChart } from "../styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useDataContext } from "src/contexts/dataContext";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { getStackedBarsDataFromNode } from "./getBarsDataFromNode";
import {
  StackedBarChartDataType,
  StackedBarChartProps,
} from "src/components/graphs";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useTaxonomicBreadcrumbNavigation } from "src/components/shared/hooks/useTaxonomicBreadcrumbNavigation";
import { HeatTreeSection } from "./HeatTreeSection/HeatTreeSection";
import { SpeciesRichness } from "./SpeciesRichness/SpeciesRichness";

export const DendrogramDetails = () => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();

  const [barChartData, setBarChartData] = useState<StackedBarChartDataType[]>();
  const [node, setNode] = useState<
    d3.HierarchyNode<TreeDataType> | undefined
  >();

  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const { breadcrumbItems, breadcrumbAddLevel, breadcrumbSelectedLevel } =
    useTaxonomicBreadcrumbNavigation();

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
    breadcrumbAddLevel(node);
    const stackedBarsData = getStackedBarsDataFromNode(node);
    setBarChartData(() => stackedBarsData);
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

  const breadcrumbPressHandler = (node: d3.HierarchyNode<TreeDataType>) => {
    breadcrumbSelectedLevel(node);
    setNode(() => node);
  };

  return (
    <>
      <SpeciesRichness />
      <StyledDetailChart $marginTop="3rem">
        <HeatTreeSection />
      </StyledDetailChart>
      <StyledDetailChart ref={resizeContainerRef} $marginTop="3rem">
        {!loading && !!barChartData && (
          <>
            <Breadcrumbs>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                breadcrumbItems.current.map((breadcrumbItem: any) => (
                  <BreadcrumbItem
                    key={breadcrumbItem.data[0] || "Root"}
                    onPress={() => breadcrumbPressHandler(breadcrumbItem)}
                  >
                    {breadcrumbItem.data[0] || "Root"}
                  </BreadcrumbItem>
                ))
              }
            </Breadcrumbs>
            {renderGraph(
              <StackedBarChart
                dimensions={dimensions ?? [0, 0]}
                isBasicInteractive
                data={barChartData}
                onBarClick={onBarClick}
                isFullInteractive
              />,
              dimensions
            )}
          </>
        )}
      </StyledDetailChart>
    </>
  );
};
