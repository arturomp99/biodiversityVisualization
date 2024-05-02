import React, { FC, createRef, useEffect, useRef } from "react";
import { BarChartProps } from "../graphsProps.types";
import { getBarChartScales } from "./getBarChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { barChartParameters, resizeTimeout } from "src/data/constants";
import { StyledBarChartContainer } from "../StackedBarChart/styles";
import { drawBars } from "./drawBars";
import { addTooltip } from "../shared/addTooltip";
import { BarChartPointType } from "../graphsPoints.types";
import { barChartClickInteraction } from "./interaction/barChartClickInteraction";

export const BarChart: FC<BarChartProps> = ({
  dimensions,
  data,
  isXLabelDiagonal,
  customMargin,
  isFullInteractive,
  isLog,
  onBarClick,
}) => {
  const node = createRef<SVGSVGElement>();
  const scalingRef = useRef(getBarChartScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions, customMargin);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scalingRef.current = getBarChartScales(data, realDimensions);
    if (!scalingRef.current?.scales) {
      return;
    }
    const scaledData = scalingRef.current.scaleData(data, isLog);
    if (!scaledData) {
      return;
    }
    createAxes(
      node.current,
      [
        scalingRef.current.scales.xScale,
        isLog
          ? scalingRef.current.scales.yScaleLog
          : scalingRef.current.scales.yScale,
      ],
      realDimensions,
      barChartParameters.axesParameters,
      undefined,
      customMargin,
      isXLabelDiagonal
    );
    drawBars(node.current, scaledData, customMargin);
    if (isFullInteractive) {
      addTooltip<BarChartPointType>(
        node.current,
        (dataPoint) => `${dataPoint.tooltipContent?.numDetections} detections`
      );
    }
    if (onBarClick) {
      barChartClickInteraction(node.current, onBarClick);
    }
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
        return;
      }
      // So that it only happens after a time delay
      scalingRef.current = getBarChartScales(data, realDimensions);
      if (!scalingRef.current?.scales) return;

      giveSizeToAxes(
        node.current,
        [
          scalingRef.current.scales.xScale,
          isLog
            ? scalingRef.current.scales.yScaleLog
            : scalingRef.current.scales.yScale,
        ],
        realDimensions,
        {
          ...barChartParameters.axesParameters,
        },
        customMargin
      );

      const scaledData = scalingRef.current.scaleData(data, isLog);
      if (!scaledData) {
        return;
      }
      drawBars(node.current, scaledData, customMargin);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledBarChartContainer ref={node}></StyledBarChartContainer>;
};
