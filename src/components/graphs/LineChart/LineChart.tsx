import React, { FC } from "react";
import { createRef, useEffect } from "react";
import { StyledLineChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
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
  const scales = useLineChartScales(data);

  useEffect(() => {
    if (!data) {
      return;
    }
    const [xScale, yScale] = scales;
    const scaledData = data.map((dataPoint: SoundChartDataType) => {
      return {
        key: dataPoint.timeStamp,
        scaledX: xScale(dataPoint.timeStamp),
        scaledY: yScale(dataPoint.soundMax),
      };
    });
    drawLines(node.current, scaledData);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !data || !node.current) {
        return;
      }
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        dimensions,
        lineChartParameters.axesParameters
      );

      const [xScale, yScale] = scales;
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
  }, [dimensions, scales, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, scales, dimensions);
  }, [node.current]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
