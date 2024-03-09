import React, { createRef, useEffect, FC, useRef } from "react";
import { StyledTimeLineContainer } from "./styles";
import { getTimeLineScales } from "./getTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { resizeTimeout, timeLineParameters } from "src/data/constants";
import { drawMarkers } from "./drawMarkers";
import { useDataContext } from "src/contexts/dataContext";
import { GraphProps } from "../graphsProps.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";

export const TimeLine: FC<GraphProps> = ({ dimensions }) => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const node = createRef<SVGSVGElement>();
  const scaling = useRef(getTimeLineScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scaling.current = getTimeLineScales(data, realDimensions);
    if (!scaling.current?.scales) return;
    const scaledData = scaling.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = realDimensions;
    createAxes(
      node.current,
      scaling.current.scales,
      realDimensions,
      timeLineParameters.axesParameters,
      ["Time", ""]
    );
    drawMarkers(node.current, scaledData, graphHeight);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current || !scaling.current?.scales) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scaling.current.scales,
        realDimensions,
        timeLineParameters.axesParameters
      );
      const scaledData = scaling.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      const [, graphHeight] = realDimensions;
      drawMarkers(node.current, scaledData, graphHeight);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
