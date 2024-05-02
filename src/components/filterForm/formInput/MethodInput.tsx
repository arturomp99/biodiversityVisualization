import React, { FC, useCallback } from "react";
import { FilterInputProps } from "./types";
import { FiltersDataType } from "src/components/shared/hooks/useReadData/types";
import {
  TypeOfFilter,
  IdentificationMethodFilterType,
} from "src/data/filters.types";
import { Checkbox } from "@nextui-org/react";

const MethodInput: FC<
  FilterInputProps<
    FiltersDataType["identificationMethod"],
    IdentificationMethodFilterType
  >
> = ({ filtersData, addFilter, removeFilter, selectedFilters }) => {
  const checkboxHandler = useCallback(
    (selectedMethod: string, isSelected: boolean) => {
      if (!addFilter || !removeFilter) return;
      isSelected
        ? addFilter({
            type: TypeOfFilter.IdentificationMethod,
            methodId: selectedMethod,
          })
        : removeFilter({
            type: TypeOfFilter.IdentificationMethod,
            methodId: selectedMethod,
          });
    },
    [addFilter, removeFilter]
  );

  return (
    <>
      {filtersData?.map((methodFilterData, key) => (
        <Checkbox
          key={key}
          size="sm"
          color="success"
          onValueChange={(isSelected: boolean) =>
            checkboxHandler(methodFilterData, isSelected)
          }
          isSelected={
            selectedFilters?.findIndex(
              (selectedFilter) => methodFilterData === selectedFilter.methodId
            ) !== -1
          }
        >
          {methodFilterData}
        </Checkbox>
      ))}
    </>
  );
};

export const MemoMethodInput = React.memo(MethodInput);
