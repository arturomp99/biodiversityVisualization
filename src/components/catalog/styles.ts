import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const CatalogContainerStyled = styled.div`
  background-color: inherit;
  color: black;
  padding: ${themeSizes.elementsMargins.lg} ${themeSizes.appPaddings.xl};
  display: flex;
  flex-direction: column;
  gap: ${themeSizes.elementsMargins.md};
  min-height: 100vh;
`;
