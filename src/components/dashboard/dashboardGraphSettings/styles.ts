import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledGraphSettings = styled.div`
  display: block;
  position: relative;
  transform: translate(0, -100%);
  bottom: ${themeSizes.elementsMargins.md};
  left: ${themeSizes.elementsMargins.md};
`;

export const StyledDendrogramSettings = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${themeSizes.elementsMargins.md};
`;
