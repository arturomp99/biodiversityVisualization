import React, { Dispatch } from "react";
import { StyledDendrogramSettings } from "./styles";
import { Button } from "@nextui-org/react";
import {
  DendrogramSettingActions,
  DendrogramSettingStates,
  SettingActions,
} from "./types";
import { CustomCheckBox } from "src/components/shared/CustomCheckBox/CustomCheckBox";

export const DendrorgamSettings = ({
  setSettings,
}: {
  setSettings: Dispatch<{
    type: DendrogramSettingActions | SettingActions | DendrogramSettingStates;
    value?: unknown;
  }>;
}) => {
  return (
    <StyledDendrogramSettings>
      <Button
        color="success"
        variant="ghost"
        className="text-black"
        onPress={() => setSettings({ type: DendrogramSettingActions.EXPAND })}
      >
        EXPAND
      </Button>
      <Button
        color="success"
        variant="ghost"
        className="text-black"
        onPress={() => setSettings({ type: DendrogramSettingActions.COLLAPSE })}
      >
        COLLAPSE
      </Button>
      <CustomCheckBox
        label={"Show labels"}
        onClick={(selected: boolean) =>
          setSettings({
            type: DendrogramSettingStates.LABELS_SHOWN,
            value: selected,
          })
        }
      />
    </StyledDendrogramSettings>
  );
};
