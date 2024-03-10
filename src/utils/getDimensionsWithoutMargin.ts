import { graphMargin } from "src/data/constants";
import { getGraphMargins } from "./getGraphMargins";

export const getDimensionsWithoutMargin = (
  dimensions: [number, number],
  customMargin?: Partial<typeof graphMargin>
) => {
  const margins = getGraphMargins(customMargin);
  const realDimensions: [number, number] = [
    dimensions[0] - margins.left - margins.right,
    dimensions[1] - margins.top - margins.bottom,
  ];
  return realDimensions;
};
