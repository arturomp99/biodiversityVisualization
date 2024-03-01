import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledFilterSectionLayout = styled.div`
  background-color: inherit;
  color: white;
  padding: ${themeSizes.elementsMargins.lg} ${themeSizes.appPaddings.xs};
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: ${themeSizes.elementsMargins.md};
  min-height: 52px;
  width: 100%;
`;
