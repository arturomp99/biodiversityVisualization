import { DataType } from "src/data/data.types";
import {
  ConfidenceFilterType,
  DropFilterType,
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
      const eventDates = dataEntry.eventDate;
      return eventDates.some(
        (eventDate) =>
          filter.minTime < new Date(eventDate).getTime() &&
          new Date(eventDate).getTime() < filter.maxTime
      );
    })
  );
};

const applyDropFilter = (data: DataType[], filters: DropFilterType[]) => {
  if (!filters.length) {
    return data;
  }
  return data.filter((dataEntry) =>
    filters.some((filter) => dataEntry.dropId === filter.dropId)
  );
};

const applyConfidenceFilter = (
  data: DataType[],
  filters: ConfidenceFilterType[]
) => {
  if (!filters.length) {
    return data;
  }

  const filteredData = data.reduce<DataType[]>((acc: DataType[], curr) => {
    const higherConfidences = curr["Confidence%"].filter((confidence) =>
      filters.every((filter) => +confidence > filter.confidenceLevel)
    );
    if (higherConfidences.length > 0) {
      acc.push({
        ...curr,
        "Confidence%": higherConfidences,
        observationsNum: higherConfidences.length,
      });
    }
    return acc;
  }, []);
  // .filter((dataEntry) =>
  //   filters.some((filter) => {
  //     const confidences = dataEntry["Confidence%"];
  //     const higherConfidences = confidences.filter(
  //       (confidence) => +confidence >= filter.confidenceLevel
  //     );
  //     dataEntry["observationsNum"] = higherConfidences.length;
  //     dataEntry["Confidence%"] = higherConfidences;
  //     return dataEntry["observationsNum"] > 0;
  //   })
  // );
  return filteredData;
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
  const dropFilters = filters.filter(
    (filter) => filter.type === TypeOfFilter.Drop
  ) as DropFilterType[];
  const confidenceFilters = filters.filter(
    (filter) => filter.type === TypeOfFilter.Confidence
  ) as ConfidenceFilterType[];

  const taxonomicFilteredData = applyTaxonomicFilter(data, taxonomicFilters);
  const temporalFilteredData = applyTemporalFilter(
    taxonomicFilteredData,
    temporalFilters
  );
  const dropFilteredData = applyDropFilter(temporalFilteredData, dropFilters);
  const confidenceFilteredData = applyConfidenceFilter(
    dropFilteredData,
    confidenceFilters
  );
  return confidenceFilteredData;
};
