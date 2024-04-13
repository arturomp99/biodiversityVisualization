import React, { FC, useCallback, useEffect, useState } from "react";
import { FilterInputProps } from "./types";
import { ConfidenceFilterType, TypeOfFilter } from "src/data/filters.types";
import { Slider, SliderValue } from "@nextui-org/react";

const ConfidenceInput: FC<
  Omit<FilterInputProps<number, ConfidenceFilterType>, "filtersData">
> = ({ addFilter, selectedFilters }) => {
  const [value, setValue] = useState(0);

  const confidenceFilterHandler = useCallback(
    (filterValue: number) => {
      if (!addFilter) {
        return;
      }
      addFilter({
        type: TypeOfFilter.Confidence,
        confidenceLevel: filterValue,
      });
    },
    [addFilter]
  );

  useEffect(() => {
    if (!selectedFilters || !selectedFilters[0]) {
      setValue(() => 0);
      return;
    }
    setValue(selectedFilters[0].confidenceLevel);
  }, [selectedFilters]);

  return (
    <Slider
      label=" "
      step={0.01}
      maxValue={1}
      minValue={0}
      color="success"
      size="sm"
      value={value}
      defaultValue={0}
      getValue={(percentage: SliderValue) =>
        `${((percentage as number) * 100) | 0}%`
      }
      marks={[
        {
          value: 0.25,
          label: "25%",
        },
        {
          value: 0.5,
          label: "50%",
        },
        {
          value: 0.75,
          label: "75%",
        },
      ]}
      className="max-w-md"
      onChange={(value: SliderValue) => setValue(value as number)}
      onChangeEnd={(value: SliderValue) =>
        confidenceFilterHandler(value as number)
      }
    />
  );
};

export const MemoConfidenceInput = React.memo(ConfidenceInput);
