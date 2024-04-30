import React, { useCallback, useEffect } from "react";
import { StackedBarChart } from "src/components/graphs/StackedBarChart/StackedBarChart";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { StyledDetailChart } from "../../styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useTaxonomicBreadcrumbNavigation } from "src/components/shared/hooks/useTaxonomicBreadcrumbNavigation";
import { useGetBarChartData } from "./useGetBarChartData";
import { getStackedBarsDataFromNode } from "../getBarsDataFromNode";
import { StackedBarChartProps } from "src/components/graphs";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import styled from "styled-components";
import { themeFont } from "src/data/theme";

const StyledTitle = styled.p`
  font-size: ${themeFont.h4.size};
  font-weight: ${themeFont.h3.weight};
`;

export const SpeciesPerTaxon = () => {
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const { node, setNode, barChartData, setBarChartData, loading } =
    useGetBarChartData();

  const { breadcrumbItems, breadcrumbAddLevel, breadcrumbSelectedLevel } =
    useTaxonomicBreadcrumbNavigation();

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
    <StyledGraphCard $noHover className="mt-12">
      <StyledTitle>Species per taxon</StyledTitle>
      <StyledDetailChart ref={resizeContainerRef}>
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
    </StyledGraphCard>
  );
};
