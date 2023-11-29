export interface MapProps {
  isBasicInteractive: boolean;
}

export interface GeoJSONDataType {
  type: string;
  features: GeoJSONDataFeature[];
}

export interface GeoJSONDataFeature {
  type: string;
  properties: object;
  geometry: {
    type: string;
    coordinates?: Array<Array<Array<number[]>>>;
  };
}
