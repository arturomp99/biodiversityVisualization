import React, { FC, createRef, useEffect, useRef } from "react";
import { StackedBarChartProps } from "./BarChart.types";
import { getStackedBarChartScales } from "./getStackedBarChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { getBarChartHeight } from "./getBarChartHeight";
import { StyledBarChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { barChartParameters, resizeTimeout } from "src/data/constants";
import { drawBars } from "./drawBars";

export const StackedBarChart: FC<StackedBarChartProps> = ({
  dimensions: [width], // We calculate height from the amount of rows
  data,
  onBarClick,
}) => {
  const node = createRef<SVGSVGElement>();
  const scalingRef = useRef(getStackedBarChartScales(data));

  const [realWidth] = getDimensionsWithoutMargin([width, 0]);
  const { realHeight, totalHeight } = getBarChartHeight(data.length);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scalingRef.current = getStackedBarChartScales(data, [
      realWidth,
      realHeight,
    ]);
    if (!scalingRef.current?.scales) return;
    const scaledData = scalingRef.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    createAxes(
      node.current,
      [scalingRef.current.scales.xScale, scalingRef.current.scales.yScale],
      [realWidth, realHeight],
      barChartParameters.axesParameters
    );
    drawBars(node.current, scaledData, onBarClick);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current || !scalingRef.current?.scales) {
        return;
      }
      // So that it only happens after a time delay
      scalingRef.current = getStackedBarChartScales(data, [
        realWidth,
        realHeight,
      ]);
      if (!scalingRef.current?.scales) return;

      giveSizeToAxes(
        node.current,
        [scalingRef.current.scales.xScale, scalingRef.current.scales.yScale],
        [realWidth, realHeight],
        barChartParameters.axesParameters
      );

      const scaledData = scalingRef.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      drawBars(node.current, scaledData, onBarClick);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realWidth]);

  return (
    <StyledBarChartContainer
      ref={node}
      height={totalHeight}
    ></StyledBarChartContainer>
  );
};
