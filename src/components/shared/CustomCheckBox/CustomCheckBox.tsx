import React from "react";
import { CheckIcon } from "./CheckIcon";
import { Chip, VisuallyHidden, tv, useCheckbox } from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-green-500 hover:bg-green-500 hover:border-green-500",
        content: "text-black pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomCheckBox = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (selected: boolean) => void;
}) => {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: false,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        onClick={() => onClick(!isSelected)}
        {...getLabelProps()}
      >
        {label}
      </Chip>
    </label>
  );
};
