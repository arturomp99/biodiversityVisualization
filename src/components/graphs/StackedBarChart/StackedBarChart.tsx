import React, { FC, createRef, useEffect, useRef } from "react";
import { getStackedBarChartScales } from "./getStackedBarChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { getBarChartHeight } from "./getBarChartHeight";
import { StyledBarChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import {
  barChartParameters,
  fontSize,
  resizeTimeout,
} from "src/data/constants";
import { drawBars } from "./drawBars";
import { StackedBarChartProps } from "../graphsProps.types";
import { addTooltip } from "../shared/addTooltip";
import { stackedBarChartClassNames } from "src/data/idClassNames";

export const StackedBarChart: FC<StackedBarChartProps> = ({
  dimensions: [width], // We calculate height from the amount of rows
  data,
  onBarClick,
  isFullInteractive,
}) => {
  const node = createRef<SVGSVGElement>();
  const scalingRef = useRef(getStackedBarChartScales(data));

  const customMargin = { left: 8 * fontSize };
  const [realWidth] = getDimensionsWithoutMargin([width, 0], customMargin);
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
      barChartParameters.axesParameters,
      undefined,
      customMargin
    );
    drawBars(node.current, scaledData, onBarClick, customMargin);
    if (isFullInteractive) {
      addTooltip<[unknown, typeof scaledData]>(
        node.current,
        (dataPoint) => {
          const speciesNum = dataPoint[1].reduce<number>(
            (acc: number, curr) => (acc += curr.species ?? 0),
            0
          );

          return `${speciesNum} species`;
        },
        `.${stackedBarChartClassNames.bar}`
      );
    }
    console.log("arturo RENDER", data);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
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
        barChartParameters.axesParameters,
        customMargin
      );

      const scaledData = scalingRef.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      drawBars(node.current, scaledData, onBarClick, customMargin);
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
