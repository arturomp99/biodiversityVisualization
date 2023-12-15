import React, { createRef, useEffect, FC } from "react";
import { StyledTimeLineContainer } from "./styles";
import { useTimeLineScales } from "./useTimeLineScales";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { timeLineParameters } from "src/data/constants";
import { drawMarkers } from "./drawMarkers";
import { useDataContext } from "src/contexts/dataContext";
import { GraphProps } from "../graphs.types";

export const TimeLine: FC<GraphProps> = ({ dimensions }) => {
  const {
    timeLineData: { data, loading },
  } = useDataContext();

  const node = createRef<SVGSVGElement>();
  const { scales, scaleData } = useTimeLineScales(data);

  useEffect(() => {
    if (!data) {
      return;
    }
    const scaledData = scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = dimensions;
    drawMarkers(node.current, scaledData, graphHeight);
  }, [data, scaleData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        dimensions,
        timeLineParameters.axesParameters
      );
      const scaledData = scaleData(data);
      if (!scaledData) {
        return;
      }
      const [, graphHeight] = dimensions;
      drawMarkers(node.current, scaledData, graphHeight);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, scales, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(
      node.current,
      scales,
      dimensions,
      timeLineParameters.axesParameters
    );
  }, [node.current]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
