import {
  DashboardGraphSettingsType,
  DendrogramSettingsType,
} from "src/components/dashboard/dashboardGraphSettings/types";
import { DashboardGraphName } from "src/components/dashboard/dashboardGraphs/DashboardGraph";
import { TimelineChartDataType } from "src/components/graphs";
import { DataType } from "src/data/data.types";
import {
  DropFilterType,
  FiltersType,
  TaxonomicFilterType,
  TemporalFilterType,
  TypeOfFilter,
} from "src/data/filters.types";

export const isTaxonomicDataType = (array: unknown[]): array is DataType[] => {
  return (
    typeof array[0] === "object" &&
    array[0] !== null &&
    "occurrenceID" in array[0]
  );
};

export const isTemporalDataType = (
  array: unknown[]
): array is TimelineChartDataType[] => {
  return (
    typeof array[0] === "object" && array[0] !== null && "timestamp" in array[0]
  );
};

export const isTaxonomicFilterType = (
  filter: FiltersType
): filter is TaxonomicFilterType => {
  return filter.type === TypeOfFilter.Taxonomic;
};

export const isTemporalFilterType = (
  filter: FiltersType
): filter is TemporalFilterType => {
  return filter.type === TypeOfFilter.Temporal;
};

export const isDropFilterType = (
  filter: FiltersType
): filter is DropFilterType => {
  return filter.type === TypeOfFilter.Drop;
};

export const isDendrogramSettings = (
  settings: DashboardGraphSettingsType
): settings is DendrogramSettingsType => {
  return settings.type === DashboardGraphName.DENDROGRAM;
};
