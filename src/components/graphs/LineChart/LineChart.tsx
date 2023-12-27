import React, { FC, useRef } from "react";
import { createRef, useEffect } from "react";
import {
  StyledLineChartContainer,
  StyledContainer,
  StyledLegendContainer,
} from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { lineChartParameters } from "../../../data/constants";
import { SoundChartDataType } from "./lineChart.types";
import { useDataContext } from "src/contexts/dataContext";
import { GraphProps } from "../graphs.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { drawLegend } from "../shared/Legend/drawLegend";

export const LineChart: FC<GraphProps> = ({ dimensions }) => {
  const {
    lineChartData: { data, loading },
  } = useDataContext();
  const node = createRef<SVGSVGElement>();
  const legendRef = createRef<SVGSVGElement>();
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
    if (lineChartParameters.legend.isPresent && !!legendRef.current) {
      drawLegend(legendRef.current, scaledData, colorScale);
    }
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current || !scales.current) {
        return;
      }
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
    }, 1000);

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
      {lineChartParameters.legend.isPresent && (
        <StyledLegendContainer id="legendContainer" ref={legendRef} />
      )}
    </StyledContainer>
  );
};
