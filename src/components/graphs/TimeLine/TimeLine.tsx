import React, { createRef, useEffect, useCallback } from "react";
import { StyledTimeLineContainer } from "./styles";
// import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { useTimeLineScales } from "./useTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { timeLineParameters } from "src/data/constants";
import { observeResize } from "src/utils/observeResize";
import { drawMarkers } from "./drawMarkers";
import { useDataContext } from "src/contexts/dataContext";

export const TimeLine = () => {
  const {
    timeLineData: { data, loading },
  } = useDataContext();

  const node = createRef<SVGSVGElement>();
  const { dimensions, setDimensions: setGraphDimensions } = useGetGraphCoordSys(
    [0, 0]
  );

  const { scales, scaleData } = useTimeLineScales(data);

  useEffect(() => {
    if (!data) {
      return;
    }
    const scaledData = scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = dimensions;
    drawMarkers(node.current, scaledData, graphHeight);
  }, [data, scaleData]);

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
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        dimensions,
        timeLineParameters.axesParameters
      );
      const scaledData = scaleData(data);
      if (!scaledData) {
        return;
      }
      const [, graphHeight] = dimensions;
      drawMarkers(node.current, scaledData, graphHeight);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, scales, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, scales);
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
