import React, { createRef, useEffect, FC, useRef } from "react";
import { StyledTimeLineContainer } from "./styles";
import { getTimeLineScales } from "./getTimeLineScales";
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
  const scaling = useRef(getTimeLineScales(data));

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scaling.current = getTimeLineScales(data, dimensions);
    if (!scaling.current?.scales) return;
    const scaledData = scaling.current.scaleData(data);
    if (!scaledData) {
      return;
    }
    const [, graphHeight] = dimensions;
    createAxes(
      node.current,
      scaling.current.scales,
      dimensions,
      timeLineParameters.axesParameters
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
        dimensions,
        timeLineParameters.axesParameters
      );
      const scaledData = scaling.current.scaleData(data);
      if (!scaledData) {
        return;
      }
      const [, graphHeight] = dimensions;
      drawMarkers(node.current, scaledData, graphHeight);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions]);

  return <StyledTimeLineContainer ref={node} id="lineChart" />;
};
