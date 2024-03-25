import { Checkbox } from "@nextui-org/react";
import React, { useCallback } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { useFiltersContext } from "src/contexts/filtersContext";
import { TypeOfFilter } from "src/data/filters.types";

export const DropInput = () => {
  const { filtersData } = useDataContext();
  const { addFilter, removeFilter } = useFiltersContext();

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
      {filtersData?.drop?.data.map((dropFilterData, key) => (
        <Checkbox
          key={key}
          value="sensor-1"
          size="sm"
          color="success"
          onValueChange={(isSelected: boolean) =>
            checkboxHandler(dropFilterData, isSelected)
          }
        >
          {dropFilterData}
        </Checkbox>
      ))}
    </>
  );
};
