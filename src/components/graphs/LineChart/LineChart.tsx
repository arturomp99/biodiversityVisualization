import React, { FC, useRef } from "react";
import { createRef, useEffect } from "react";
import { StyledLineChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { lineChartParameters } from "../../../data/constants";
import { SoundChartDataType } from "./lineChart.types";
import { useDataContext } from "src/contexts/dataContext";
import { GraphProps } from "../graphs.types";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";

export const LineChart: FC<GraphProps> = ({ dimensions }) => {
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
    const [xScale, yScale] = scales.current;
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
      scales.current,
      realDimensions,
      lineChartParameters.axesParameters,
      ["time (s)", "sound"]
    );
    drawLines(node.current, scaledData);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current || !scales.current) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales.current,
        realDimensions,
        lineChartParameters.axesParameters
      );

      const [xScale, yScale] = scales.current;
      const scaledData = data.map((dataPoint) => {
        return {
          key: dataPoint.timeStamp,
          scaledX: xScale(dataPoint.timeStamp),
          scaledY: yScale(dataPoint.soundMax),
          id: dataPoint.sensorID,
        };
      });
      drawLines(node.current, scaledData);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  if (loading) {
    return <div>LOADING LINE CHART DATA...</div>;
  }

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
