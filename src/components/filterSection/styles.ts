import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledFilterSectionLayout = styled.div`
  background-color: inherit;
  color: white;
  padding: ${themeSizes.elementsMargins.lg} ${themeSizes.appPaddings.xs};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: ${themeSizes.elementsMargins.md};
  min-height: 94px;
  width: 100%;
  border-bottom: 1px solid #bebebe;
`;
