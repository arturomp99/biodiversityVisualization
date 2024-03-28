import { useEffect } from "react";
import {
  DendrogramSettingActions,
  DendrogramSettingsType,
  SettingActions,
} from "src/components/dashboard/dashboardGraphSettings/types";
import { collapseAllMarkers, expandAllMarkers } from "./nodesInteractivity";
import { removeNodeInfoInteractivity } from "./nodeInfoInteractivity.ts/removeNodeInfoInteractivity";
import { addNodeInfoInteractivity } from "./nodeInfoInteractivity.ts/addNodeInfoInteractivity";

export const useDendrogramSettingsInteractivity = (
  nodeElement: SVGSVGElement | null,
  settings: DendrogramSettingsType | undefined,
  settingsActionCallback: (action: SettingActions) => void
) => {
  useEffect(() => {
    if (!settings || !settings.actionFlag || !nodeElement) {
      return;
    }
    if (settings.actionFlag === DendrogramSettingActions.EXPAND) {
      expandAllMarkers(nodeElement);
    } else if (settings.actionFlag === DendrogramSettingActions.COLLAPSE) {
      collapseAllMarkers(nodeElement);
    }
    settingsActionCallback(SettingActions.CLEARFLAGS);
  }, [settings?.actionFlag, nodeElement]);

  useEffect(() => {
    if (!settings || !nodeElement) {
      return;
    }
    settings?.state?.labelsShown
      ? removeNodeInfoInteractivity(nodeElement)
      : addNodeInfoInteractivity(nodeElement);
  }, [settings?.state?.labelsShown, nodeElement]);
};
