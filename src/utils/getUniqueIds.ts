import * as d3 from "d3";

export const getUniqueIds = <Type extends { id: string }>(data: Type[]) => {
  return d3
    .groups(data, (dataLine) => dataLine.id)
    .map((dataLine) => dataLine[0]);
};
