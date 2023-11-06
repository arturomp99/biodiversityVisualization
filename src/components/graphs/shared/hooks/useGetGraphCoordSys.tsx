import { useState } from "react";

import { graphMargin } from "../../../../data/constants";

export const useGetGraphCoordSys = (initialDimensions: [number, number]) => {
  const [dimensions, setDimensions] = useState(initialDimensions);

  const setDimensionsFromBoundingBox = ([
    boundingWidth,
    boundingHeight,
  ]: number[]): void => {
    setDimensions([
      boundingWidth - graphMargin.left - graphMargin.right,
      boundingHeight - graphMargin.top - graphMargin.bottom,
    ]);
  };

  return {
    dimensions,
    setDimensions: setDimensionsFromBoundingBox,
  };
};
