import { Autocomplete } from "@nextui-org/react";
import React, { FC, Key, ReactElement, useEffect, useState } from "react";

type ControlledAutocompleteProps = {
  children: ReactElement | ReactElement[];
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
  const [value, setValue] = useState<Key | null>();

  useEffect(() => {
    onValueChanged(value as number);
  }, [value]);

  return (
    <Autocomplete
      label={label}
      variant="faded"
      disableSelectorIconRotation
      isLoading={loading}
      selectedKey={value as number}
      onSelectionChange={setValue}
    >
      {children}
    </Autocomplete>
  );
};
