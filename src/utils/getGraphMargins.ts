import { graphMargin } from "src/data/constants";

export const getGraphMargins = (
  customMargin?: Partial<typeof graphMargin>
): typeof graphMargin => {
  const left = customMargin?.left ?? graphMargin.left;
  const right = customMargin?.right ?? graphMargin.right;
  const top = customMargin?.top ?? graphMargin.top;
  const bottom = customMargin?.bottom ?? graphMargin.bottom;

  return { left, right, top, bottom };
};
