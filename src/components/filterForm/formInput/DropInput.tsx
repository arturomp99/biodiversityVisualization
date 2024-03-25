import { Checkbox } from "@nextui-org/react";
import React, { FC, useCallback } from "react";
import { DropFilterType, TypeOfFilter } from "src/data/filters.types";
import { FilterInputProps } from "./types";
import { DropFiltersDataType } from "src/components/shared/hooks/useGetFiltersData/asyncGetDropFiltersData";

const DropInput: FC<FilterInputProps<DropFiltersDataType, DropFilterType>> = ({
  filtersData,
  addFilter,
  removeFilter,
  selectedFilters,
}) => {
  const checkboxHandler = useCallback(
    (selectedDrop: string, isSelected: boolean) => {
      if (!addFilter || !removeFilter) {
        return;
      }
      isSelected
        ? addFilter({
            dropId: selectedDrop,
            type: TypeOfFilter.Drop,
          })
        : removeFilter({ dropId: selectedDrop, type: TypeOfFilter.Drop });
    },
    [addFilter, removeFilter]
  );

  return (
    <>
      {filtersData?.data.map((dropFilterData, key) => (
        <Checkbox
          key={key}
          value="sensor-1"
          size="sm"
          color="success"
          onValueChange={(isSelected: boolean) =>
            checkboxHandler(dropFilterData, isSelected)
          }
          isSelected={
            selectedFilters?.findIndex(
              (selectedFilter) => selectedFilter.dropId === dropFilterData
            ) !== -1
          }
        >
          {dropFilterData}
        </Checkbox>
      ))}
    </>
  );
};

export const MemoDropInput = React.memo(DropInput);
