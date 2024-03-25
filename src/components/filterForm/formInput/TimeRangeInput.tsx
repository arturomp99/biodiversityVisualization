import { Slider } from "@nextui-org/react";
import React, { useCallback, FC, useState, useEffect } from "react";
import { TemporalFilterType, TypeOfFilter } from "src/data/filters.types";
import { FilterInputProps } from "./types";
import { TimeFiltersDataType } from "src/components/shared/hooks/useGetFiltersData/asyncGetTimeFiltersData";

const TimeRangeInput: FC<
  FilterInputProps<TimeFiltersDataType, TemporalFilterType>
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
        filtersData?.data[0]?.getTime() ?? 0,
        filtersData?.data[1]?.getTime() ?? 0,
      ]);
      return;
    }
    setValue([selectedFilters[0].minTime, selectedFilters[0].maxTime]);
  }, [selectedFilters]);

  return (
    <Slider
      label=" "
      loading={filtersData?.loading || false}
      size="sm"
      color="success"
      minValue={filtersData?.data[0]?.getTime()}
      maxValue={filtersData?.data[1]?.getTime()}
      value={value}
      defaultValue={filtersData?.data}
      getValue={(time: string) => {
        const minDate = new Date(time[0]);
        const maxDate = new Date(time[1]);
        return `${minDate.getDate()}/${minDate.getMonth()} ${minDate.getHours()}:${minDate.getMinutes()}:${minDate.getSeconds()} - 
        ${maxDate.getDate()}/${minDate.getMonth()} ${maxDate.getHours()}:${maxDate.getMinutes()}:${maxDate.getSeconds()}`;
      }}
      className="max-w-md"
      onChange={setValue}
      onChangeEnd={(value: [number, number]) => timeRangeFilterHandler(value)}
    ></Slider>
  );
};

export const MemoTimeRangeInput = React.memo(TimeRangeInput);
