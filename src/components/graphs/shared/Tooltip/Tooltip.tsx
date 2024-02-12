import React, { FC, ReactNode, useState } from "react";
import * as d3 from "d3";

import { TooltipWrapper } from "./Tooltip.styles";
import { tooltipInteractiveClass } from "src/data/idClassNames";

type TooltipPropsType = {
  parentId: string;
  children?: ReactNode;
};
export const Tooltip: FC<TooltipPropsType> = ({ parentId, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  console.log(
    d3.select(`#${parentId}`).selectAll(`.${tooltipInteractiveClass}`)
  );

  console.log("done");

  return (
    isTooltipVisible && (
      <TooltipWrapper
        isVisible={isTooltipVisible}
        renderingPosition={[100, 100]}
      >
        children
      </TooltipWrapper>
    )
  );
};
