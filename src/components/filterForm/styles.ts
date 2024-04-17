import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledFilterFormLayout = styled.div`
  padding-left: ${themeSizes.appPaddings.md};
  padding-right: ${themeSizes.appPaddings.xs};
  padding-top: ${themeSizes.appPaddings.xs};
  display: flex;
  flex-direction: column;
  gap: ${themeSizes.elementsMargins.md};
  border: 1px solid #bebebe;
  border-top: none;
  background-color: white;
`;
