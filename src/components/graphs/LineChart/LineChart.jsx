import React from "react";
import * as d3 from "d3";
import { createRef, useCallback, useEffect, useState } from "react";
import { StyledLineChartContainer } from "./styles";
import { createAxes, giveSizeToAxes } from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
import { createLines } from "./drawLines";
import { observeResize } from "../../../utils/observeResize";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { lineChartParameters } from "../../../data/constants";
import sampleSound from "../../../data/sampleData/sampleSoundData.csv";

export const LineChart = () => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.csv(sampleSound, (soundData) => {
      return {
        timeStamp: soundData.TimeStamp,
        soundMax: soundData.soundMax,
      };
    }).then((d) => {
      setLoading(false);
      setData(d);
    });
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    createLines(node.current, data);
  }, [data]);
  // TODO -----------------------------------------------------------------

  const node = createRef();
  let {
    dimensions: [graphWidth, graphHeight],
    setDimensions: setGraphDimensions,
    transform: transform2GraphSpace,
  } = useGetGraphCoordSys([0, 0]);

  const scales = useLineChartScales(data);

  const resizeEventHandler = useCallback((resizedElement) => {
    setGraphDimensions([
      resizedElement[0].contentRect.width,
      resizedElement[0].contentRect.height,
    ]);
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    const timeoutId = setTimeout(() => {
      // It that it only happens after a time delay
      giveSizeToAxes(
        node.current,
        scales,
        [graphWidth, graphHeight],
        lineChartParameters.axesParameters
      );
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
