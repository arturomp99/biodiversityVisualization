import React from "react";
import { Slider } from "@nextui-org/react";

export const ConfidenceDistributionSettings = ({
  onStepChange,
  maxValue,
}: {
  onStepChange?: (step: number) => void;
  maxValue?: number;
}) => {
  return (
    <Slider
      label="Step size"
      step={0.01}
      maxValue={maxValue ?? 1}
      minValue={0.01}
      className="max-w-md"
      color="success"
      defaultValue={0.1}
      onChangeEnd={(value) => onStepChange && onStepChange(value as number)}
    />
  );
};
