import { TimelineChartDataType } from "src/components/graphs";
import { DataType } from "src/data/data.types";
import {
  FiltersType,
  TaxonomicFilterType,
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
): filter is TaxonomicFilterType => {
  return filter.type === TypeOfFilter.Temporal;
};
