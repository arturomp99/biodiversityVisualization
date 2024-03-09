import { Slider } from "@nextui-org/react";
import React from "react";
// import { useDataContext } from "src/contexts/dataContext";

export const TimeRangeInput = () => {
  return (
    <Slider
      label="Filter by time"
      size="sm"
      color="success"
      defaultValue={[0, 10]}
      className="max-w-md"
    ></Slider>
  );
};
