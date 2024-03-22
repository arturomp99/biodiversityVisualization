import * as d3 from "d3";

export const getMapScales = (): {
  dronePathColorScale: d3.ScaleSequential<string, never>;
} => {
  const dronePathColorScale = d3.scaleSequential(d3.interpolateTurbo);
  return { dronePathColorScale };
};
