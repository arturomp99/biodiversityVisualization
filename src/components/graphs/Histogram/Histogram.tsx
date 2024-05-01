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
import { histogramClickInteraction } from "./Interaction/histogramClickInteraction";

export const Histogram: FC<HistogramProps<DataType>> = ({
  data,
  dimensions,
  onHover,
  xExtent,
  reducerFunction,
  stackFunction,
  colorScale,
  onBarClick,
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
                scientificNames: stackedRectPerBar.data
                  .filter(
                    (dataPointObservation) =>
                      stackFunction(dataPointObservation) === stackedRect.key
                  )
                  .flatMap(
                    (dataPointObservation) =>
                      dataPointObservation.scientificName ?? ""
                  ),
                value: reducerFunction
                  ? stackedRectPerBar[1] - stackedRectPerBar[0]
                  : undefined,
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
              scientificNames: dataPoint.flatMap(
                (dataPointObservation) =>
                  dataPointObservation.scientificName ?? ""
              ),
              value: reducerFunction ? reducerFunction(dataPoint) : undefined,
            };
          });
    createAxes(
      node.current,
      [xScale, yScale],
      realDimensions,
      histogramParameters.axesParameters
    );
    drawHistogram(node.current, scaledData, colorScale, (dataPoint) => {
      const count = dataPoint.value ?? dataPoint?.ids?.length ?? 0;
      return count.toString();
    });
    if (onHover) {
      histogramHoverInteraction(node.current, onHover);
    }
    if (onBarClick) {
      histogramClickInteraction(node.current, onBarClick);
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
                  scientificNames: stackedRectPerBar.data
                    .filter(
                      (dataPointObservation) =>
                        stackFunction(dataPointObservation) === stackedRect.key
                    )
                    .flatMap(
                      (dataPointObservation) =>
                        dataPointObservation.scientificName ?? ""
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
                scientificNames: dataPoint.flatMap(
                  (dataPointObservation) =>
                    dataPointObservation.scientificName ?? ""
                ),
              };
            });
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        realDimensions,
        histogramParameters.axesParameters
      );
      drawHistogram(node.current, scaledData, colorScale, (dataPoint) => {
        const count = dataPoint.value ?? dataPoint?.ids?.length ?? 0;
        return count.toString();
      });
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledHistogramContainer ref={node} id="histogram" />;
};
