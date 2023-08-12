import { createRef, useEffect } from "react";
import { StyledLineChartContainer } from "./styles";
import { drawAxes } from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";

export const LineChart = () => {
  const node = createRef();

  let [xScale, yScale] = useLineChartScales();

  useEffect(() => {
    if (!node) return;
    drawAxes(node.current, xScale, yScale);
  }, [node]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
