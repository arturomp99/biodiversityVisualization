import React, { createRef, useEffect, FC, useRef } from "react";
import { StyledTimeLineContainer } from "./styles";
import { getTimeLineScales } from "./getTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { resizeTimeout, timeLineParameters } from "src/data/constants";
import { drawMarkers } from "./drawMarkers";
import { GraphProps } from "../graphsProps.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { useTimelineDetailInteraction } from "./interactivity/useTimelineDetailInteraction";
import { useGetTimelineData } from "./useGetTimelineData";
import { useGetTimelineColorScale } from "./useGetTimelineColorScale";
import { LegendFilterType } from "./TimeLineGraph";

export const TimeLine: FC<
  GraphProps & {
    data: ReturnType<typeof useGetTimelineData>["data"];
    colorScale: ReturnType<typeof useGetTimelineColorScale>["colorScale"];
    groupKey?: LegendFilterType;
    legendHover?: string[];
  }
> = ({ dimensions, data, colorScale, groupKey, legendHover }) => {
  const node = createRef<SVGSVGElement>();
  const scaling = useRef(getTimeLineScales(data, undefined, groupKey));

  const realDimensions = getDimensionsWithoutMargin(dimensions, {
    bottom: 48,
  });

  useTimelineDetailInteraction(node, legendHover);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scaling.current = getTimeLineScales(data, realDimensions, groupKey);
    if (!scaling.current?.xScale || !scaling.current.yScale) return;
    const scaledData = scaling.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = realDimensions;
    createAxes(
      node.current,
      [scaling.current.xScale, scaling.current.yScale],
      realDimensions,
      timeLineParameters.axesParameters,
      ["Time", ""]
    );
    drawMarkers(node.current, scaledData, graphHeight, colorScale);
  }, [data]);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scaling.current = getTimeLineScales(data, realDimensions, groupKey);
    if (!scaling.current?.xScale || !scaling.current.yScale) return;
    const scaledData = scaling.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = realDimensions;
    drawMarkers(node.current, scaledData, graphHeight, colorScale);
  }, [groupKey]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !data ||
        !node.current ||
        !scaling.current?.xScale ||
        !scaling.current.yScale
      ) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        [scaling.current.xScale, scaling.current.yScale],
        realDimensions,
        timeLineParameters.axesParameters
      );
      const scaledData = scaling.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      const [, graphHeight] = realDimensions;
      drawMarkers(node.current, scaledData, graphHeight, colorScale);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions, colorScale]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
