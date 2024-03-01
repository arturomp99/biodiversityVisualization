import { Autocomplete } from "@nextui-org/react";
import React, { FC, ReactNode, useEffect, useState } from "react";

type ControlledAutocompleteProps = {
  children: ReactNode;
  label: string;
  loading: boolean;
  onValueChanged: (value: number | undefined) => void;
};

export const ControlledAutocomplete: FC<ControlledAutocompleteProps> = ({
  children,
  label,
  loading,
  onValueChanged,
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    onValueChanged(value);
  }, [value]);

  return (
    <Autocomplete
      label={label}
      variant="faded"
      disableSelectorIconRotation
      isLoading={loading}
      selectedKey={value}
      onSelectionChange={setValue}
    >
      {children}
    </Autocomplete>
  );
};
