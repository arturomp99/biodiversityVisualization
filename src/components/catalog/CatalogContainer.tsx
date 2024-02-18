import React, { FC } from "react";
import { CatalogContainerStyled } from "./styles";
import { CatalogContainerProps } from "./types";

export const CatalogContainer: FC<CatalogContainerProps> = ({ children }) => {
  return <CatalogContainerStyled>{children}</CatalogContainerStyled>;
};
