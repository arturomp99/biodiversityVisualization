import React, { ReactNode } from "react";
import { StyledGraphCard } from "./styles";

export const GraphCard = (props: { children: ReactNode }) => {
  return <StyledGraphCard>{props.children}</StyledGraphCard>;
};
