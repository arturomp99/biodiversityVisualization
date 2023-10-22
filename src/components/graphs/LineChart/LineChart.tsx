import React from "react";
import * as d3 from "d3";
import { createRef, useCallback, useEffect, useState } from "react";
import { StyledLineChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
import { drawLines } from "./drawLines";
import { observeResize } from "../../../utils/observeResize";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { lineChartParameters } from "../../../data/constants";
import { SoundChartDataType } from "./lineChart.types";
import { SoundHeaders } from "../../../data/sampleData/sampleData.types";
import { DSVRowString } from "d3";

export const LineChart = () => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState<SoundChartDataType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.csv(
      "./sampleData/sampleSoundData.csv",
      (soundData: DSVRowString<SoundHeaders>) => {
        return {
          timeStamp: Number(soundData.timeStamp),
          soundMax: Number(soundData.soundMax),
        };
      }
    ).then((d) => {
      setLoading(false);
      setData(Array.from(d));
    });
  }, []);
  // TODO -----------------------------------------------------------------

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

  const node = createRef<SVGSVGElement>();
  const {
    dimensions: [graphWidth, graphHeight],
    setDimensions: setGraphDimensions,
  } = useGetGraphCoordSys([0, 0]);

  const scales = useLineChartScales(data);

  const resizeEventHandler = useCallback(
    (resizedElement: ResizeObserverEntry[]) => {
      setGraphDimensions([
        resizedElement[0].contentRect.width,
        resizedElement[0].contentRect.height,
      ]);
    },
    []
  );

  useEffect(() => {
    if (loading || !data) {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (!node.current) return;
      // So that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        [graphWidth, graphHeight],
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
  }, [graphWidth, graphHeight, scales, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, scales);
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
