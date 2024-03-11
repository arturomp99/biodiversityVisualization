import React from "react";
import { StyledInfoIcon } from "../shared/containers/Card/styles";
import { InfoIcon } from "src/icons/InfoIcon";
import Tippy from "@tippyjs/react";

export const GraphInfo = (props: { info: string }) => {
  const { info } = props;
  return (
    <Tippy content={info}>
      <StyledInfoIcon>
        <InfoIcon />
      </StyledInfoIcon>
    </Tippy>
  );
};
