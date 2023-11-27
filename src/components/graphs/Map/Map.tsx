import React, { FC, useEffect, useState } from "react";
import { GraphProps } from "../graphs.types";
import { mapData } from "src/data";
import { GeoJSONDataType } from "./map.types";

export const Map: FC<GraphProps> = ({ isBasicInteractive }) => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState<GeoJSONDataType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!mapData) {
      return;
    }
    setLoading(false);
    console.log("data loaded", mapData);
    setData(mapData);
    // setData(dendrogramData as DendrogramDataType);
  }, [mapData]);
  return <h1>THIS IS A MAP</h1>;
};
