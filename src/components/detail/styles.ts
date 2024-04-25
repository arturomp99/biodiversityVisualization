import styled, { css } from "styled-components";
import { themeSizes } from "src/data/theme";

export const DetailLayout = styled.div`
  min-height: 100vh;
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-bottom: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
`;

export const ExpandedView = styled.div<{ isOnGroundChart: boolean }>`
  ${({ isOnGroundChart }) =>
    !isOnGroundChart &&
    css`
      height: 75vh;
    `}
`;

export const DetailHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: ${themeSizes.elementsMargins.sm};
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
`;
