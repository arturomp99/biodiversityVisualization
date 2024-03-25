import { DataType } from "src/data/data.types";

export type DropFiltersDataType = {
  data: string[];
  loading: boolean;
};

export const asyncGetDropFiltersData = async (data: DataType[]) => {
  const dropFiltersData = data.reduce<DropFiltersDataType["data"]>(
    (result, currentObject) => {
      const existingId = result.find((value) => value === currentObject.dropId);
      !existingId && result.push(currentObject.dropId as string);
      return result;
    },
    []
  );

  return dropFiltersData;
};
