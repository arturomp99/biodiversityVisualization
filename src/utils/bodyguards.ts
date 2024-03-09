import { TimelineChartDataType } from "src/components/graphs";
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
): array is TimelineChartDataType[] => {
  return (
    typeof array[0] === "object" && array[0] !== null && "timestamp" in array[0]
  );
};
