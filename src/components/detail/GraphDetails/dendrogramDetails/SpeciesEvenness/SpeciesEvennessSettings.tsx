import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

export const SpeciesEvennessSettings = (props: {
  isLogCallback?: (isLog: boolean) => void;
}) => {
  const { isLogCallback } = props;
  const [selected, setSelected] = useState("logarithmic");

  useEffect(
    () => isLogCallback && isLogCallback(selected === "logarithmic"),
    [selected]
  );
  return (
    <RadioGroup
      orientation="horizontal"
      value={selected}
      onValueChange={setSelected}
    >
      <Radio value="logarithmic" color="success">
        Logarithmic
      </Radio>
      <Radio value="linear" color="success">
        Linear
      </Radio>
    </RadioGroup>
  );
};
