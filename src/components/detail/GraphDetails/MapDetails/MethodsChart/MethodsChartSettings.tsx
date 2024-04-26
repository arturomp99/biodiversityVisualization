import { Radio, RadioGroup } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";

type MethodsChartSettingsProps = {
  isObservationsCallback?: (isObservations: boolean) => void;
};

export const MethodsChartSettings: FC<MethodsChartSettingsProps> = (props) => {
  const { isObservationsCallback } = props;
  const [selected, setSelected] = useState("species");

  useEffect(
    () =>
      isObservationsCallback &&
      isObservationsCallback(selected === "observations"),
    [selected]
  );
  return (
    <RadioGroup
      orientation="horizontal"
      value={selected}
      onValueChange={setSelected}
    >
      <Radio value="species" color="success">
        Species
      </Radio>
      <Radio value="observations" color="success">
        Observations
      </Radio>
    </RadioGroup>
  );
};
