import React, { FC, createRef, useEffect, useRef } from "react";
import { BarChartProps } from "../graphsProps.types";
import { getBarChartScales } from "./getBarChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { barChartParameters, resizeTimeout } from "src/data/constants";
import { StyledBarChartContainer } from "../StackedBarChart/styles";
import { drawBars } from "./drawBars";

export const BarChart: FC<BarChartProps> = ({ dimensions, data }) => {
  const node = createRef<SVGSVGElement>();
  const scalingRef = useRef(getBarChartScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scalingRef.current = getBarChartScales(data, realDimensions);
    if (!scalingRef.current?.scales) {
      return;
    }
    const scaledData = scalingRef.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    createAxes(
      node.current,
      [scalingRef.current.scales.xScale, scalingRef.current.scales.yScale],
      realDimensions,
      barChartParameters.axesParameters
    );
    drawBars(node.current, scaledData);
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
        [scalingRef.current.scales.xScale, scalingRef.current.scales.yScale],
        realDimensions,
        {
          ...barChartParameters.axesParameters,
        }
      );

      const scaledData = scalingRef.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      drawBars(node.current, scaledData);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledBarChartContainer ref={node}></StyledBarChartContainer>;
};
