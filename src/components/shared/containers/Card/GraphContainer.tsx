import React, { ReactNode } from "react";
import { StyledGraphContainer } from "./styles";

export const GraphContainer = (props: { children: ReactNode }) => {
  return <StyledGraphContainer>{props.children}</StyledGraphContainer>;
};
