export interface MapProps {
  isBasicInteractive: boolean;
}

export interface GeoJSONDataType {
  type: string;
  properties?: object;
  coordinates?: Array<Array<Array<number[]>>>;
  geometry?: GeoJSONDataType;
}
