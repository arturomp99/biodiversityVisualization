import React, { FC, useEffect, useState, createRef, useCallback } from "react";
import { GraphProps } from "../graphs.types";
import { mapData } from "src/data";
import { GeoJSONDataFeature } from "./map.types";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { giveSizeToAxes } from "../shared/Axes/drawAxes";

export const Map: FC<GraphProps> = ({ isBasicInteractive }) => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState<GeoJSONDataFeature | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [shouldDrawMap, setShouldDrawMap] = useState(false);
  useEffect(() => {
    if (!mapData) {
      return;
    }
    setLoading(false);
    setData(mapData);
    // setData(dendrogramData as DendrogramDataType);
  }, [mapData]);
  // TODO -----------------------------------------------------------------

  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();
  const { dimensions, setDimensions: setGraphDimensions } = useGetGraphCoordSys(
    [0, 0]
  );

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
    const timeoutId = setTimeout(() => {
      setShouldDrawMap(
        (!loading && !dimensions[0]) || (!dimensions[1] && !!node.current)
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, loading]);

  useEffect(() => {
    if (!shouldDrawMap || !data || !zoomContainer.current) {
      return;
    }
    const scaledData = scaleData(data, dimensions);
    drawMap(scaledData, zoomContainer.current);
  }, [shouldDrawDendrogram]);
  return <h1>THIS IS A MAP</h1>;
};
