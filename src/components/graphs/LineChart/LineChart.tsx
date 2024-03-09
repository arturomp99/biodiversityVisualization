import React, { FC, useRef } from "react";
import { createRef, useEffect } from "react";
import { StyledLineChartContainer, StyledContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import {
  graphMargin,
  lineChartParameters,
  resizeTimeout,
} from "../../../data/constants";
import { LineChartProps } from "../graphsProps.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { addBrush } from "../shared/Interactivity/brush";
import { Legend } from "../shared/Legend/Legend";
import {
  lineChartLegendClick,
  lineChartLegendMouseOver,
  lineChartLegendMouseOut,
} from "./interactivity/lineChartLegendInteractivity";
import { getUniqueIds } from "src/utils/getUniqueIds";
import { lineChartClassNames } from "src/data/idClassNames";
import { useLineChartBrushInteractivity } from "./interactivity/useLineChartBrushInteractivity";
import { LineChartDataType } from "../graphsData.types";

export const LineChart: FC<LineChartProps> = ({
  dimensions,
  isBasicInteractive,
  data,
  isBrushInteractive,
}) => {
  const { brushExtent, lineChartBrushInteractivity } =
    useLineChartBrushInteractivity();
  const node = createRef<SVGSVGElement>();
  const scales = useRef(getLineChartScales(data));

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getLineChartScales(data, realDimensions);
    if (!scales.current) return;
    const [xScale, yScale, colorScale] = scales.current;
    const scaledData = data.map((dataPoint: LineChartDataType) => {
      return {
        key: dataPoint.timeStamp,
        scaledX: xScale(dataPoint.timeStamp),
        scaledY: yScale(dataPoint.value),
        id: dataPoint.group,
      };
    });
    createAxes(
      node.current,
      [xScale, yScale],
      realDimensions,
      lineChartParameters.axesParameters,
      ["time (s)", "sound"]
    );
    drawLines(node.current, scaledData, colorScale);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!data || !node.current) {
        return;
      }
      if (!scales.current) return;
      scales.current = getLineChartScales(data, realDimensions, {
        x:
          brushExtent && isBrushInteractive
            ? [
                scales.current[0]
                  .invert(brushExtent[0] - graphMargin.left)
                  .getTime(),
                scales.current[0]
                  .invert(brushExtent[1] - graphMargin.left)
                  .getTime(),
              ]
            : undefined,
      });
      if (!scales.current) return;

      const [xScale, yScale, colorScale] = scales.current;
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        realDimensions,
        lineChartParameters.axesParameters
      );

      const scaledData = data
        .map((dataPoint) => {
          return {
            key: dataPoint.timeStamp,
            scaledX: xScale(dataPoint.timeStamp),
            scaledY: yScale(dataPoint.value),
            id: dataPoint.group,
          };
        })
        .filter(
          (dataPoint) =>
            dataPoint.scaledX > 0 && dataPoint.scaledX < realDimensions[0]
        );
      drawLines(node.current, scaledData, colorScale);
      if (isBrushInteractive) {
        addBrush(
          node.current,
          `.${lineChartClassNames.linesGroup}`,
          lineChartBrushInteractivity
        );
      }
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions, brushExtent]);

  return (
    <StyledContainer>
      <StyledLineChartContainer ref={node} id="lineChart" />
      {lineChartParameters.legend.isPresent && !!data && scales.current && (
        <Legend
          keys={getUniqueIds(
            data.map((dataPoint) => ({ id: dataPoint.group }))
          )}
          colorScale={scales.current[2]}
          interactivity={
            isBasicInteractive
              ? {
                  clickHandler: lineChartLegendClick,
                  mouseOverHandler: lineChartLegendMouseOver,
                  mouseOutHandler: lineChartLegendMouseOut,
                }
              : undefined
          }
        />
      )}
    </StyledContainer>
  );
};
