import { DataType } from "src/data/data.types";
import {
  FiltersType,
  TaxonomicFilterType,
  TemporalFilterType,
  TypeOfFilter,
} from "src/data/filters.types";

const applyTaxonomicFilter = (
  data: DataType[],
  filters: TaxonomicFilterType[]
) => {
  if (!filters.length) {
    return data;
  }
  return data.filter((dataEntry) =>
    filters.some((filter) => {
      const dataEntryValue = dataEntry[filter.level] as string;
      return (
        dataEntryValue.toLocaleLowerCase() === filter.value.toLocaleLowerCase()
      );
    })
  );
};

const applyTemporalFilter = (
  data: DataType[],
  filters: TemporalFilterType[]
) => {
  if (!filters.length) {
    return data;
  }
  return data.filter((dataEntry) =>
    filters.some((filter) => {
      const eventDates = dataEntry.eventDate as string[];
      return eventDates.some(
        (eventDate) =>
          filter.minTime < new Date(eventDate).getTime() &&
          new Date(eventDate).getTime() < filter.maxTime
      );
    })
  );
};

export const filterTaxonomicData = (
  data: DataType[],
  filters: FiltersType[]
) => {
  const taxonomicFilters = filters.filter(
    (filter) => filter.type === TypeOfFilter.Taxonomic
  ) as TaxonomicFilterType[];
  const temporalFilters = filters.filter(
    (filter) => filter.type === TypeOfFilter.Temporal
  ) as TemporalFilterType[];

  const taxonomicFilteredData = applyTaxonomicFilter(data, taxonomicFilters);
  return applyTemporalFilter(taxonomicFilteredData, temporalFilters);
};
