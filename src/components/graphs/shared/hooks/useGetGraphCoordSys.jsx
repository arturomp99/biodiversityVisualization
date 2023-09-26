import { useState, useCallback } from "react";

import { graphMargin } from "../../../../data/constants";

export const useGetGraphCoordSys = (initialDimensions) => {
  let [[width, height], setDimensions] = useState(initialDimensions);

  const setDimensionsFromBoundingBox = ([boundingWidth, boundingHeight]) => {
    setDimensions([
      boundingWidth - graphMargin.left - graphMargin.right,
      boundingHeight - graphMargin.top - graphMargin.bottom,
    ]);
  };

  const transform2GraphSpace = useCallback(
    // This is assuming that the centre of coordinates is at the top left corner of the svg
    ([xCoord, yCoord]) => {
      return [xCoord - graphMargin.left, yCoord + graphMargin.top + height];
    },
    [height]
  );

  return {
    dimensions: [width, height],
    setDimensions: setDimensionsFromBoundingBox,
    transform: transform2GraphSpace,
  };
};
