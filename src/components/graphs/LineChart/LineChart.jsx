import * as d3 from "d3";
import { createRef, useCallback, useEffect, useState } from "react";
import { StyledLineChartContainer } from "./styles";
import {
  createAxes,
  giveSizeToAxes,
  translateAxes,
} from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
import { observeResize } from "../../../utils/observeResize";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { createGrid } from "../shared/Grid/drawGrid";
import { lineChartParameters } from "../../../data/constants";

export const LineChart = () => {
  const node = createRef();
  let {
    dimensions: [graphWidth, graphHeight],
    setDimensions: setGraphDimensions,
    transform: transform2GraphSpace,
  } = useGetGraphCoordSys([0, 0]);

  const [xScale, yScale] = useLineChartScales();

  const resizeEventHandler = useCallback((resizedElement) => {
    setGraphDimensions([
      resizedElement[0].contentRect.width,
      resizedElement[0].contentRect.height,
    ]);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // It that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        [graphWidth, graphHeight],
        lineChartParameters.axesParameters
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [graphWidth, graphHeight]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, [xScale, yScale]);
    createGrid();
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
