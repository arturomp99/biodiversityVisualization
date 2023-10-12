import React from "react";
import * as d3 from "d3";
import { createRef, useCallback, useEffect, useState } from "react";
import { StyledLineChartContainer } from "./styles";
import {
  createAxes,
  giveSizeToAxes,
  translateAxes,
} from "../shared/Axes/drawAxes";
import { useLineChartScales } from "./useLineChartScales";
import { observeResize } from "../../../utils/observeResize";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { lineChartParameters } from "../../../data/constants";
import sampleSound from "../../../data/sampleData/sampleSoundData.csv";
import { createLines } from "./drawLines.js";

export const LineChart = () => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.csv(sampleSound, (soundData) => {
      return {
        timeStamp: soundData.TimeStamp,
        soundMax: soundData.SoundMax,
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
  // -----------------------------------------------------------------

  const node = createRef();
  let {
    dimensions: [graphWidth, graphHeight],
    setDimensions: setGraphDimensions,
    transform: transform2GraphSpace,
  } = useGetGraphCoordSys([0, 0]);

  const [xScale, yScale] = useLineChartScales(data);

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
        [xScale, yScale],
        [graphWidth, graphHeight],
        lineChartParameters.axesParameters
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [graphWidth, graphHeight, loading]);

  useEffect(() => {
    if (!node.current) return;
    createAxes(node.current, [xScale, yScale]);
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  return <StyledLineChartContainer ref={node} id="lineChart" />;
};
