import { TimelineChartDataType } from "src/components/graphs";
import { FiltersType, TypeOfFilter } from "src/data/filters.types";

export const filterTemporalData = (
  data: TimelineChartDataType[],
  filters: FiltersType[]
) => {
  const filteredFilters = filters.filter(
    (filterToCheck) => filterToCheck.type !== TypeOfFilter.Taxonomic
  ) as Omit<FiltersType, "TaxonomiFilterType">[]; // Taxonomic filters do not apply

  return data.filter(() =>
    filteredFilters.some(() => {
      // TODO: IMPLEMENT
    })
  );
};
