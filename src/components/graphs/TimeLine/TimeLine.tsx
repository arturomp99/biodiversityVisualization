import React, { createRef, useEffect, FC, useRef } from "react";
import { uniq } from "lodash";
import { StyledTimeLineContainer } from "./styles";
import { getTimeLineScales } from "./getTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { resizeTimeout, timeLineParameters } from "src/data/constants";
import { drawMarkers } from "./drawMarkers";
import { GraphProps } from "../graphsProps.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { StyledContainer } from "../LineChart/styles";
import { Legend } from "../shared/Legend/Legend";
import { useTimelineDetailInteraction } from "./interactivity/useTimelineDetailInteraction";
import { useGetTimelineData } from "./useGetTimelineData";

export const TimeLine: FC<GraphProps & { shouldAddLegend?: boolean }> = ({
  dimensions,
  shouldAddLegend,
}) => {
  const { data, loading } = useGetTimelineData();
  const node = createRef<SVGSVGElement>();
  const scaling = useRef(getTimeLineScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useTimelineDetailInteraction(node);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scaling.current = getTimeLineScales(data, realDimensions);
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
    drawMarkers(
      node.current,
      scaledData,
      graphHeight,
      scaling.current.colorScale
    );
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        loading ||
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
      drawMarkers(
        node.current,
        scaledData,
        graphHeight,
        scaling.current.colorScale
      );
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return (
    <StyledContainer>
      <StyledTimeLineContainer ref={node} id="lineChart" />
      {shouldAddLegend && !!data && scaling.current && (
        <Legend
          keys={uniq(data.map((dataPoint) => dataPoint.class as string))}
          colorScale={scaling.current.colorScale}
        />
      )}
    </StyledContainer>
  );
};
