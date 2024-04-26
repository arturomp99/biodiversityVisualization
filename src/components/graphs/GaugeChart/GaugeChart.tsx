import React, { FC, createRef, useEffect, useRef } from "react";
import { GaugeChartProps } from "../graphsProps.types";
import { getGaugeChartScales } from "./getGaugeChartScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { GaugePointType } from "../graphsPoints.types";
import { drawGauge } from "./drawGauge";
import { resizeTimeout } from "src/data/constants";

export const GaugeChart: FC<GaugeChartProps> = ({ data, dimensions }) => {
  const node = createRef<SVGSVGElement>();
  const scales = useRef(getGaugeChartScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getGaugeChartScales(data, realDimensions);
    const [, realHeight] = realDimensions;
    if (!scales.current) return;
    const xScale = scales.current;
    const scaledData: GaugePointType = {
      height: 0.5 * realHeight,
      scaledX0: xScale(0),
      scaledX1: xScale((data.count * 100) / data.totalCount),
      scaledX100: xScale(100),
    };
    drawGauge(node.current, scaledData, realHeight);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
        return;
      }
      if (!scales.current) return;
      scales.current = getGaugeChartScales(data, realDimensions);
      const [, realHeight] = realDimensions;
      if (!scales.current) return;

      const xScale = scales.current;
      // So that it only happens after a time delay

      const scaledData: GaugePointType = {
        height: 0.5 * realHeight,
        scaledX0: xScale(0),
        scaledX1: xScale((data.count * 100) / data.totalCount),
        scaledX100: xScale(100),
      };
      drawGauge(node.current, scaledData, realHeight);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <svg className="relative w-full h-[16px]" ref={node} />;
};
