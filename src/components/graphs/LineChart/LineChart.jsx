import * as d3 from "d3";
import { createRef, useCallback, useEffect, useState } from "react";
import { StyledLineChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
import { observeResize } from "../../../utils/observeResize";

export const LineChart = () => {
  const node = createRef();
  let [[width, height], setDimensions] = useState([0, 0]);
  let [xScale, yScale] = useLineChartScales();

  const resizeEventHandler = useCallback((resizedElement) => {
    setDimensions([
      resizedElement[0].contentRect.width,
      resizedElement[0].contentRect.height,
    ]);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // So that it only happens after a time delay
      console.log("dimensions changed !!!!!!!!!!!!!!");
      console.log(`[${width},${height}]`);
      giveSizeToAxes(node.current, xScale, yScale, width, height);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [width, height]);

  useEffect(() => {
    if (!node.current) return;
    console.log("node has changed");
    createAxes(node.current, xScale, yScale);
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
