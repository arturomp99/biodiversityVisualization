import React, { FC, useEffect, useRef } from "react";
import { HistogramProps } from "..";
import { StyledHistogramContainer } from "./styles";
import { getHistogramScales } from "./getHistogramScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { histogramParameters, resizeTimeout } from "src/data/constants";
import { drawHistogram } from "./drawHistogram";
import { DataType } from "src/data/data.types";
import { histogramHoverInteraction } from "./Interaction/histogramHoverInteraction";

export const Histogram: FC<HistogramProps<DataType>> = ({
  data,
  dimensions,
  onHover,
  xExtent,
}) => {
  const node = useRef<SVGSVGElement>(null);
  const scales = useRef(getHistogramScales(data, xExtent));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getHistogramScales(data, xExtent, realDimensions);
    if (!scales.current) {
      return;
    }
    const { xScale, yScale, binnedData } = scales.current;
    const scaledData = binnedData.map((dataPoint) => {
      return {
        scaledX0: dataPoint.x0 ? xScale(new Date(dataPoint.x0)) : null,
        scaledX1: dataPoint.x1 ? xScale(new Date(dataPoint.x1)) : null,
        scaledY0: yScale(0),
        scaledY1: yScale(dataPoint.length),
        ids: dataPoint.flatMap(
          (dataPointObservation) => dataPointObservation.occurrenceID ?? ""
        ),
      };
    });
    createAxes(
      node.current,
      [xScale, yScale],
      realDimensions,
      histogramParameters.axesParameters
    );
    drawHistogram(node.current, scaledData);
    if (onHover) {
      histogramHoverInteraction(node.current, onHover);
    }
    // if (isCursorInteractive) {
    //   mouseCursor(node.current);
    // }
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
        return;
      }
      if (!scales.current) {
        return;
      }
      scales.current = getHistogramScales(data, xExtent, realDimensions);
      if (!scales.current) {
        return;
      }
      const { xScale, yScale, binnedData } = scales.current;
      const scaledData = binnedData.map((dataPoint) => {
        return {
          scaledX0: dataPoint.x0 ? xScale(new Date(dataPoint.x0)) : null,
          scaledX1: dataPoint.x1 ? xScale(new Date(dataPoint.x1)) : null,
          scaledY0: yScale(0),
          scaledY1: yScale(dataPoint.length),
          ids: dataPoint.flatMap(
            (dataPointObservation) => dataPointObservation.species ?? ""
          ),
        };
      });
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        realDimensions,
        histogramParameters.axesParameters
      );
      drawHistogram(node.current, scaledData);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledHistogramContainer ref={node} id="histogram" />;
};
