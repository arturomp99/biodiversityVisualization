import React, { FC, useEffect, useRef, useMemo } from "react";
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
  reducerFunction,
  stackFunction,
  colorScale,
}) => {
  const node = useRef<SVGSVGElement>(null);
  const scales = useRef(
    getHistogramScales(
      data,
      xExtent,
      undefined,
      undefined,
      reducerFunction,
      stackFunction
    )
  );

  const realDimensions = useMemo<[number, number]>(
    () => getDimensionsWithoutMargin(dimensions),
    [dimensions]
  );

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getHistogramScales(
      data,
      xExtent,
      realDimensions,
      undefined,
      reducerFunction,
      stackFunction
    );
    if (!scales.current) {
      return;
    }
    const { xScale, yScale, binnedData, stackedData } = scales.current;
    const scaledData =
      stackedData && stackFunction
        ? stackedData.flatMap((stackedRect) => {
            const scaledStackedRect = stackedRect.map((stackedRectPerBar) => {
              return {
                group: stackedRect.key,
                scaledX0: stackedRectPerBar.data.x0
                  ? xScale(new Date(stackedRectPerBar.data.x0))
                  : null,
                scaledX1: stackedRectPerBar.data.x1
                  ? xScale(new Date(stackedRectPerBar.data.x1))
                  : null,
                scaledY0: yScale(stackedRectPerBar[0]),
                scaledY1: yScale(stackedRectPerBar[1]),
                ids: stackedRectPerBar.data
                  .filter(
                    (dataPointObservation) =>
                      stackFunction(dataPointObservation) === stackedRect.key
                  )
                  .flatMap(
                    (dataPointObservation) => dataPointObservation.species ?? ""
                  ),
              };
            });
            return scaledStackedRect;
          })
        : binnedData.map((dataPoint) => {
            return {
              scaledX0: dataPoint.x0 ? xScale(new Date(dataPoint.x0)) : null,
              scaledX1: dataPoint.x1 ? xScale(new Date(dataPoint.x1)) : null,
              scaledY0: yScale(0),
              scaledY1: yScale(
                reducerFunction ? reducerFunction(dataPoint) : dataPoint.length
              ),
              ids: dataPoint.flatMap(
                (dataPointObservation) => dataPointObservation.species ?? ""
              ),
            };
          });
    createAxes(
      node.current,
      [xScale, yScale],
      realDimensions,
      histogramParameters.axesParameters
    );
    drawHistogram(node.current, scaledData, colorScale);
    if (onHover) {
      histogramHoverInteraction(node.current, onHover);
    }
  }, [data, colorScale]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
        return;
      }
      if (!scales.current) {
        return;
      }
      scales.current = getHistogramScales(
        data,
        xExtent,
        realDimensions,
        undefined,
        reducerFunction,
        stackFunction
      );
      if (!scales.current) {
        return;
      }
      const { xScale, yScale, binnedData, stackedData } = scales.current;
      const scaledData =
        stackedData && stackFunction
          ? stackedData.flatMap((stackedRect) => {
              const scaledStackedRect = stackedRect.map((stackedRectPerBar) => {
                return {
                  group: stackedRect.key,
                  scaledX0: stackedRectPerBar.data.x0
                    ? xScale(new Date(stackedRectPerBar.data.x0))
                    : null,
                  scaledX1: stackedRectPerBar.data.x1
                    ? xScale(new Date(stackedRectPerBar.data.x1))
                    : null,
                  scaledY0: yScale(stackedRectPerBar[0]),
                  scaledY1: yScale(stackedRectPerBar[1]),
                  stackedRectPerBar,
                  ids: stackedRectPerBar.data
                    .filter(
                      (dataPointObservation) =>
                        stackFunction(dataPointObservation) === stackedRect.key
                    )
                    .flatMap(
                      (dataPointObservation) =>
                        dataPointObservation.species ?? ""
                    ),
                };
              });
              return scaledStackedRect;
            })
          : binnedData.map((dataPoint) => {
              return {
                scaledX0: dataPoint.x0 ? xScale(new Date(dataPoint.x0)) : null,
                scaledX1: dataPoint.x1 ? xScale(new Date(dataPoint.x1)) : null,
                scaledY0: yScale(0),
                scaledY1: yScale(
                  reducerFunction
                    ? reducerFunction(dataPoint)
                    : dataPoint.length
                ),
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
      drawHistogram(node.current, scaledData, colorScale);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledHistogramContainer ref={node} id="histogram" />;
};
