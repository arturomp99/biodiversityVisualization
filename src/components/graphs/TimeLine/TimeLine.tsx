import React, { createRef, useState, useEffect, useCallback } from "react";
import { StyledTimeLineContainer } from "./styles";
// import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { detectedAnimals } from "src/data";
// import { TimeLineDataType } from "./timeLine.types";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { useTimeLineScales } from "./useTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { timeLineParameters } from "src/data/constants";
import { TimeLineDataType } from "./timeLine.types";
import { observeResize } from "src/utils/observeResize";

export const TimeLine = () => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState<TimeLineDataType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  // TODO -----------------------------------------------------------------

  useEffect(() => {
    if (!detectedAnimals) {
      return;
    }
    setLoading(false);
    setData(detectedAnimals["detected animals"] as TimeLineDataType[]);
  }, [detectedAnimals]);

  const node = createRef<SVGSVGElement>();
  const {
    dimensions: [graphWidth, graphHeight],
    setDimensions: setGraphDimensions,
  } = useGetGraphCoordSys([0, 0]);

  const scales = useTimeLineScales(data);

  const resizeEventHandler = useCallback(
    (resizedElement: ResizeObserverEntry[]) => {
      setGraphDimensions([
        resizedElement[0].contentRect.width,
        resizedElement[0].contentRect.height,
      ]);
    },
    []
  );

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (!node.current) return;
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        [graphWidth, graphHeight],
        timeLineParameters.axesParameters
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [graphWidth, graphHeight, scales, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, scales);
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
