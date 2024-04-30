import React, { FC, useEffect, useRef, useMemo } from "react";
import { uniq } from "lodash";
import { NumericHistogramProps } from "../../graphsProps.types";
import { DataType } from "src/data/data.types";
import { getNumericHistogramScales } from "./getNumericHistogramScales";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createAxes, giveSizeToAxes } from "../../shared/Axes/drawAxes";
import { histogramParameters, resizeTimeout } from "src/data/constants";
import { drawHistogram } from "../drawHistogram";
import { histogramHoverInteraction } from "../Interaction/histogramHoverInteraction";
import { StyledHistogramContainer } from "../styles";
import { histogramClickInteraction } from "../Interaction/histogramClickInteraction";

export const NumericHistogram: FC<NumericHistogramProps<DataType>> = ({
  data,
  dimensions,
  onHover,
  xExtent,
  reducerFunction,
  stackFunction,
  colorScale,
  binFunction,
  customMargin,
  onBarClick,
}) => {
  const node = useRef<SVGSVGElement>(null);
  const scales = useRef(
    getNumericHistogramScales(
      data,
      binFunction,
      xExtent,
      undefined,
      reducerFunction,
      stackFunction
    )
  );

  const realDimensions = useMemo<[number, number]>(
    () => getDimensionsWithoutMargin(dimensions, customMargin),
    [dimensions]
  );

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getNumericHistogramScales(
      data,
      binFunction,
      xExtent,
      realDimensions,
      reducerFunction,
      stackFunction
    );
    if (!scales.current) {
      return;
    }
    const { xScale, yScale, binnedData } = scales.current;
    const scaledData = binnedData.map((dataPoint) => {
      return {
        scaledX0: dataPoint.x0 ? xScale(dataPoint.x0) : null,
        scaledX1: dataPoint.x1 ? xScale(dataPoint.x1) : null,
        scaledY0: yScale(0),
        scaledY1: yScale(
          reducerFunction ? reducerFunction(dataPoint) : dataPoint.length
        ),
        scientificNames: uniq(
          dataPoint.flatMap(
            (dataPointObservation) => dataPointObservation.scientificName ?? ""
          )
        ),
        value: reducerFunction ? reducerFunction(dataPoint) : dataPoint.length,
      };
    });
    createAxes(
      node.current,
      [xScale, yScale],
      realDimensions,
      histogramParameters.axesParameters,
      ["confidence", "observations"],
      customMargin
    );
    drawHistogram(node.current, scaledData, colorScale);
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
      scales.current = getNumericHistogramScales(
        data,
        binFunction,
        xExtent,
        realDimensions,
        reducerFunction,
        stackFunction
      );
      if (!scales.current) {
        return;
      }
      const { xScale, yScale, binnedData } = scales.current;
      const scaledData = binnedData.map((dataPoint) => {
        return {
          scaledX0: dataPoint.x0 ? xScale(dataPoint.x0) : null,
          scaledX1: dataPoint.x1 ? xScale(dataPoint.x1) : null,
          scaledY0: yScale(0),
          scaledY1: yScale(
            reducerFunction ? reducerFunction(dataPoint) : dataPoint.length
          ),
          scientificNames: uniq(
            dataPoint.flatMap(
              (dataPointObservation) =>
                dataPointObservation.scientificName ?? ""
            )
          ),
        };
      });
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        realDimensions,
        histogramParameters.axesParameters,
        customMargin
      );
      drawHistogram(node.current, scaledData, colorScale);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  return <StyledHistogramContainer ref={node} id="histogram" />;
};
