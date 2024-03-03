import React, { FC, createRef, useEffect, useRef } from "react";
import { BarChartProps } from "./BarChart.types";
import { getBarChartScales } from "./getBarChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { getBarChartHeight } from "./getBarChartHeight";
import { StyledBarChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { barChartParameters } from "src/data/constants";
import { drawBars } from "./drawBars";

export const BarChart: FC<BarChartProps> = ({
  dimensions: [width], // We calculate height from the amount of rows
  isBasicInteractive,
  data,
}) => {
  console.log(width, isBasicInteractive);
  const node = createRef<SVGSVGElement>();
  const scalingRef = useRef(getBarChartScales(data));

  const [realWidth] = getDimensionsWithoutMargin([width, 0]);
  const { realHeight, totalHeight } = getBarChartHeight(data.length);

  console.log("WIDTH", width);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scalingRef.current = getBarChartScales(data, [realWidth, realHeight]);
    if (!scalingRef.current?.scales) return;
    const scaledData = scalingRef.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    createAxes(
      node.current,
      scalingRef.current.scales,
      [realWidth, realHeight],
      barChartParameters.axesParameters
    );
    drawBars(node.current, scaledData);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current || !scalingRef.current?.scales) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scalingRef.current.scales,
        [realWidth, realHeight],
        barChartParameters.axesParameters
      );
      const scaledData = scalingRef.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      drawBars(node.current, scaledData);
    }, 1000);

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
