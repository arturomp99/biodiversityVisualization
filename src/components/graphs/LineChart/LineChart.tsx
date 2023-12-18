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

export const LineChart: FC<GraphProps> = ({ dimensions }) => {
  const {
    lineChartData: { data, loading },
  } = useDataContext();

  const node = createRef<SVGSVGElement>();
  const scales = useRef(getLineChartScales(data));

  useEffect(() => {
    if (!data || !node.current) {
      return;
    }
    scales.current = getLineChartScales(data, dimensions);
    if (!scales.current) return;
    const [xScale, yScale] = scales.current;
    const scaledData = data.map((dataPoint: SoundChartDataType) => {
      return {
        key: dataPoint.timeStamp,
        scaledX: xScale(dataPoint.timeStamp),
        scaledY: yScale(dataPoint.soundMax),
      };
    });
    createAxes(
      node.current,
      scales.current,
      dimensions,
      lineChartParameters.axesParameters
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
        dimensions,
        lineChartParameters.axesParameters
      );

      const [xScale, yScale] = scales.current;
      const scaledData = data.map((dataPoint) => {
        return {
          key: dataPoint.timeStamp,
          scaledX: xScale(dataPoint.timeStamp),
          scaledY: yScale(dataPoint.soundMax),
        };
      });
      drawLines(node.current, scaledData);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions]);

  if (loading) {
    return <div>LOADING LINE CHART DATA...</div>;
  }

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
