import { graphMargin } from "../data/constants";

export const getDimensionsWithoutMargin = (dimensions: [number, number]) => {
  const realDimensions: [number, number] = [
    dimensions[0] - graphMargin.left - graphMargin.right,
    dimensions[1] - graphMargin.top - graphMargin.bottom,
  ];
  return realDimensions;
};
