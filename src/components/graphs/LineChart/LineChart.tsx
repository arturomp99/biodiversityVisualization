import React, { FC, useRef } from "react";
import { createRef, useEffect } from "react";
import { StyledLineChartContainer, StyledContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { lineChartParameters, resizeTimeout } from "../../../data/constants";
import { SoundChartDataType } from "./lineChart.types";
import { useDataContext } from "src/contexts/dataContext";
import { GraphProps } from "../graphs.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { addBrush } from "../shared/Interactivity/brush";
import { Legend } from "../shared/Legend/Legend";
import {
  lineChartLegendClick,
  lineChartLegendMouseOver,
  lineChartLegendMouseOut,
} from "./interactivity/lineChartLegendInteractivity";
import { getUniqueIds } from "src/utils/getUniqueIds";

export const LineChart: FC<GraphProps> = ({
  dimensions,
  isBasicInteractive,
}) => {
  const {
    lineChartData: { data, loading },
  } = useDataContext();
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
    const scaledData = data.map((dataPoint: SoundChartDataType) => {
      return {
        key: dataPoint.timeStamp,
        scaledX: xScale(dataPoint.timeStamp),
        scaledY: yScale(dataPoint.soundMax),
        id: dataPoint.sensorID,
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
      if (loading || !data || !node.current) {
        return;
      }
      scales.current = getLineChartScales(data, realDimensions);
      if (!scales.current) return;

      const [xScale, yScale, colorScale] = scales.current;
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        [xScale, yScale],
        realDimensions,
        lineChartParameters.axesParameters
      );

      const scaledData = data.map((dataPoint) => {
        return {
          key: dataPoint.timeStamp,
          scaledX: xScale(dataPoint.timeStamp),
          scaledY: yScale(dataPoint.soundMax),
          id: dataPoint.sensorID,
        };
      });
      drawLines(node.current, scaledData, colorScale);
      addBrush(node.current);
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  if (loading) {
    return <div>LOADING LINE CHART DATA...</div>;
  }

  return (
    <StyledContainer>
      <StyledLineChartContainer ref={node} id="lineChart" />
      {lineChartParameters.legend.isPresent && !!data && scales.current && (
        <Legend
          keys={getUniqueIds(
            data.map((dataPoint) => ({ id: dataPoint.sensorID }))
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
