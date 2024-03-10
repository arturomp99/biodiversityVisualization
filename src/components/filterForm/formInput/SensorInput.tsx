import { Checkbox } from "@nextui-org/react";
import React from "react";

export const SensorInput = () => {
  return (
    <>
      <Checkbox value="sensor-1" size="sm" color="success">
        Sensor 1
      </Checkbox>
      <Checkbox value="sensor-2" size="sm" color="success">
        Sensor 2
      </Checkbox>
    </>
  );
};
