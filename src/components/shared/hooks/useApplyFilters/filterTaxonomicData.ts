import { DataType } from "src/data/data.types";
import { FiltersType } from "src/data/filters.types";

export const filterTaxonomicData = (
  data: DataType[],
  filters: FiltersType[]
) => {
  return data.filter((dataEntry) =>
    filters.some((filter) => {
      const dataEntryValue = dataEntry[filter.level] as string;
      return (
        dataEntryValue.toLocaleLowerCase() === filter.value.toLocaleLowerCase()
      );
    })
  );
};
