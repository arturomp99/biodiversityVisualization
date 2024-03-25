import React from "react";

import { TaxonomyInput } from "./formInput/TaxonomyInput";
import { TimeRangeInput } from "./formInput/TimeRangeInput";
import { DropInput } from "./formInput/DropInput";

import { InputDataType } from "./inputElementsData.types";

const taxonomyInputData = {
  title: "Taxonomy",
  element: <TaxonomyInput />,
};

const temporalInputData = {
  title: "Time Range",
  element: <TimeRangeInput />,
};

const dropInputData = {
  title: "DROP",
  element: <DropInput />,
};

export const inputElementsData: InputDataType[] = [
  taxonomyInputData,
  temporalInputData,
  dropInputData,
];
