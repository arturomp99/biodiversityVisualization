import { TemporalDataType } from "src/components/graphs/TimeLine/timeLine.types";
import { DataType } from "src/data/data.types";

export const isTaxonomicDataType = (array: unknown[]): array is DataType[] => {
  return (
    typeof array[0] === "object" &&
    array[0] !== null &&
    "occurrenceID" in array[0]
  );
};

export const isTemporalDataType = (
  array: unknown[]
): array is TemporalDataType[] => {
  return (
    typeof array[0] === "object" && array[0] !== null && "timestamp" in array[0]
  );
};
