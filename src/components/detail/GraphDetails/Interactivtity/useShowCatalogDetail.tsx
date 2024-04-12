import { useCallback, useState } from "react";
import { DashboardGraphName } from "src/components/dashboard/dashboardGraphs/DashboardGraph";
import {
  FiltersType,
  PositionFilterType,
  TypeOfFilter,
} from "src/data/filters.types";

export const useShowCatalogDetail = (graphName: string) => {
  const [catalogFilter, setCatalogFilter] = useState<FiltersType>();
  const showCatalogHandler = useCallback(
    (value1?: string | number, value2?: string | number) => {
      if (graphName === DashboardGraphName.MAP) {
        setCatalogFilter(() => {
          const positionFilter = {
            type: TypeOfFilter.Position,
            latitude: value1,
            longitude: value2,
          } as PositionFilterType;
          return positionFilter;
        });
      }
    },
    [graphName]
  );

  return {
    catalogFilter,
    showCatalogHandler,
  };
};
