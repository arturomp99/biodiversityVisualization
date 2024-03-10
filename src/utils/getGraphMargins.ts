import { graphMargin } from "src/data/constants";

export const getGraphMargins = (
  customMargin?: Partial<typeof graphMargin>
): typeof graphMargin => {
  const left = customMargin?.left ?? graphMargin.left;
  const right = customMargin?.right ?? graphMargin.left;
  const top = customMargin?.top ?? graphMargin.left;
  const bottom = customMargin?.bottom ?? graphMargin.left;

  return { left, right, top, bottom };
};
