import { themeColors, themeSizes } from "src/data/theme";
import styled from "styled-components";

export const CatalogContainerStyled = styled.div`
  background-color: ${themeColors.background.color3};
  color: black;
  padding: 0px ${themeSizes.appPaddings.xl};
`;
