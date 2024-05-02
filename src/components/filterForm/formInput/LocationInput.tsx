import React, { FC, useCallback } from "react";
import { FilterInputProps } from "./types";
import { LocationFilterType, TypeOfFilter } from "src/data/filters.types";
import { FiltersDataType } from "src/components/shared/hooks/useReadData/types";
import { Checkbox } from "@nextui-org/react";

const LocationInput: FC<
  FilterInputProps<FiltersDataType["location"], LocationFilterType>
> = ({ filtersData, addFilter, removeFilter, selectedFilters }) => {
  const checkboxHandler = useCallback(
    (
      selectedLocation: NonNullable<typeof filtersData>[0],
      isSelected: boolean
    ) => {
      if (!addFilter || !removeFilter) {
        return;
      }
      isSelected
        ? addFilter({
            latitude: +selectedLocation.latitude,
            longitude: +selectedLocation.longitude,
            type: TypeOfFilter.Location,
          })
        : removeFilter({
            latitude: +selectedLocation.latitude,
            longitude: +selectedLocation.longitude,
            type: TypeOfFilter.Location,
          });
    },
    [addFilter, removeFilter]
  );

  return (
    <>
      {filtersData?.map((locationFilterData, key) => (
        <Checkbox
          key={key}
          size="sm"
          color="success"
          onValueChange={(isSelected: boolean) =>
            checkboxHandler(locationFilterData, isSelected)
          }
          isSelected={
            selectedFilters?.findIndex(
              (selectedFilter) =>
                selectedFilter.latitude === locationFilterData.latitude &&
                selectedFilter.longitude === locationFilterData.longitude
            ) !== -1
          }
        >
          {locationFilterData.latitude.toString() +
            " " +
            locationFilterData.longitude.toString()}
        </Checkbox>
      ))}
    </>
  );
};

export const MemoLocationInput = React.memo(LocationInput);
