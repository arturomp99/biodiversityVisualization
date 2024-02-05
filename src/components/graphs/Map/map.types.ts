export interface MapProps {
  isBasicInteractive: boolean;
}

export interface GeoJSONDataType {
  type: string;
  features: GeoJSONDataFeature[];
}

export interface GeoJSONDataFeature {
  type: "Feature";
  properties: object;
  geometry: {
    type: "MultiPolygon";
    coordinates: Array<Array<Array<number[]>>>;
  };
}

export type MapChartDataType = {
  latitude: number;
  longitude: number;
  sensorId: string;
  observationsNum: number;
};
