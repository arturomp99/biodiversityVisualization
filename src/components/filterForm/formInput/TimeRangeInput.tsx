import { Slider } from "@nextui-org/react";
import React, { useCallback } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { useFiltersContext } from "src/contexts/filtersContext";
import { TypeOfFilter } from "src/data/filters.types";

export const TimeRangeInput = () => {
  const { filtersData } = useDataContext();
  const { addFilter, removeFilter } = useFiltersContext();

  const timeRangeFilterHandler = useCallback(
    (valueRange: [number, number]) => {
      if (!addFilter || !removeFilter) {
        return;
      }
      addFilter({
        minTime: valueRange[0],
        maxTime: valueRange[1],
        type: TypeOfFilter.Temporal,
      });
    },
    [addFilter, removeFilter]
  );

  return (
    <Slider
      label=" "
      loading={filtersData?.temporal?.loading || false}
      size="sm"
      color="success"
      minValue={filtersData?.temporal?.data[0]?.getTime()}
      maxValue={filtersData?.temporal?.data[1]?.getTime()}
      defaultValue={filtersData?.temporal?.data}
      getValue={(time: string) => {
        const minDate = new Date(time[0]);
        const maxDate = new Date(time[1]);
        return `${minDate.getDate()}/${minDate.getMonth()} ${minDate.getHours()}:${minDate.getMinutes()}:${minDate.getSeconds()} - 
        ${maxDate.getDate()}/${minDate.getMonth()} ${maxDate.getHours()}:${maxDate.getMinutes()}:${maxDate.getSeconds()}`;
      }}
      className="max-w-md"
      onChangeEnd={(value: [number, number]) => timeRangeFilterHandler(value)}
    ></Slider>
  );
};
