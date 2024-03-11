import { useCallback, useRef } from "react";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";

export const useTaxonomicBreadcrumbNavigation = () => {
  const breadcrumbItems = useRef<Array<d3.HierarchyNode<TreeDataType>>>([]);

  const breadcrumbAddLevel = useCallback(
    (levelToAdd: d3.HierarchyNode<TreeDataType>) => {
      breadcrumbItems.current = [...breadcrumbItems.current, levelToAdd];
    },
    []
  );

  const breadcrumbSelectedLevel = useCallback(
    (selectedLevel: d3.HierarchyNode<TreeDataType>) => {
      const selectedLevelIndex = breadcrumbItems.current.indexOf(selectedLevel);
      breadcrumbItems.current = breadcrumbItems.current.slice(
        0,
        selectedLevelIndex
      );
    },
    []
  );

  return { breadcrumbItems, breadcrumbAddLevel, breadcrumbSelectedLevel };
};
