import { Slider, SliderValue } from "@nextui-org/react";
import React, { useCallback, FC, useState, useEffect } from "react";
import { TemporalFilterType, TypeOfFilter } from "src/data/filters.types";
import { FilterInputProps } from "./types";
import { FiltersDataType } from "src/components/shared/hooks/useReadData/types";

const TimeRangeInput: FC<
  FilterInputProps<FiltersDataType["temporal"], TemporalFilterType>
> = ({ filtersData, addFilter, selectedFilters }) => {
  const [value, setValue] = useState<[number, number] | undefined>();

  const timeRangeFilterHandler = useCallback(
    (valueRange: [number, number]) => {
      if (!addFilter) {
        return;
      }
      addFilter({
        minTime: valueRange[0],
        maxTime: valueRange[1],
        type: TypeOfFilter.Temporal,
      });
    },
    [addFilter]
  );

  useEffect(() => {
    if (!selectedFilters || !selectedFilters[0]) {
      setValue(() => [
        !!filtersData && filtersData[0] ? filtersData[0].getTime() : 0,
        !!filtersData && filtersData[1] ? filtersData[1].getTime() : 0,
      ]);
      return;
    }
    setValue([selectedFilters[0].minTime, selectedFilters[0].maxTime]);
  }, [selectedFilters]);

  return (
    <Slider
      label=" "
      size="sm"
      color="success"
      minValue={filtersData ? filtersData[0]?.getTime() : undefined}
      maxValue={filtersData ? filtersData[1]?.getTime() : undefined}
      value={value}
      defaultValue={
        filtersData
          ? filtersData.map((dataEntry) => dataEntry?.getTime() ?? 0)
          : undefined
      }
      getValue={(time: SliderValue) => {
        const minDate = new Date((time as number[])[0]);
        const maxDate = new Date((time as number[])[1]);
        return `${minDate.getDate()}/${minDate.getMonth()} ${minDate.getHours()}:${minDate.getMinutes()}:${minDate.getSeconds()} - 
        ${maxDate.getDate()}/${minDate.getMonth()} ${maxDate.getHours()}:${maxDate.getMinutes()}:${maxDate.getSeconds()}`;
      }}
      className="max-w-md"
      onChange={(value: SliderValue) => setValue(value as [number, number])}
      onChangeEnd={(value: SliderValue) =>
        timeRangeFilterHandler(value as [number, number])
      }
    ></Slider>
  );
};

export const MemoTimeRangeInput = React.memo(TimeRangeInput);
