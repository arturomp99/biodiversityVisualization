import React from "react";

import { TaxonomyInput } from "./formInput/TaxonomyInput";
import { TimeRangeInput } from "./formInput/TimeRangeInput";
import { SensorInput } from "./formInput/SensorInput";

import { InputDataType } from "./inputElementsData.types";

const taxonomyInputData = {
  title: "Taxonomy",
  element: <TaxonomyInput />,
};

const temporalInputData = {
  title: "Time Range",
  element: <TimeRangeInput />,
};

const sensorInputData = {
  title: "Sensor",
  element: <SensorInput />,
};

export const inputElementsData: InputDataType[] = [
  taxonomyInputData,
  temporalInputData,
  sensorInputData,
];
