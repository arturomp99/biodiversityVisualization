import { themeFont, themeSizes } from "src/data/theme";
import styled from "styled-components";

export const CatalogContainerStyled = styled.div`
  background-color: inherit;
  color: black;
  padding-left: ${themeSizes.appPaddings.md};
  padding-right: ${themeSizes.appPaddings.lg};
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-bottom: ${themeSizes.elementsMargins.lg};
  display: flex;
  flex-direction: column;
  gap: ${themeSizes.elementsMargins.md};
  min-height: 100vh;
`;

export const CatalogCardTitle = styled.p`
  font-size: ${themeFont.h4.size};
  font-weight: ${themeFont.h4.weight};
`;

export const CatalogDescription = styled.div`
  & > div > p {
    margin-bottom: ${themeSizes.elementsMargins.md};
  }
`;
