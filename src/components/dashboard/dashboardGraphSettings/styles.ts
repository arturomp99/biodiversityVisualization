import styled from "styled-components";
import { themeSizes } from "src/data/theme";

export const StyledGraphSettings = styled.div<{ $isRightCorner?: boolean }>`
  display: block;
  position: absolute;
  top: ${themeSizes.elementsMargins.md};
  ${({ $isRightCorner }) =>
    $isRightCorner
      ? `right: ${themeSizes.elementsMargins.md};`
      : `left: ${themeSizes.elementsMargins.md};`}
`;

export const StyledDendrogramSettings = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${themeSizes.elementsMargins.md};
`;
