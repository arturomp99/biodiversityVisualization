import { themeSizes } from "src/data/theme";
import styled, { css } from "styled-components";

export const StyledDetailChart = styled.div<{
  $height?: string;
  $marginTop?: string;
}>`
  min-height: fit-content;
  height: ${({ $height }) => $height ?? "fit-content"};
  padding-top: ${themeSizes.graphCardPaddings.vert};
  padding-bottom: ${themeSizes.graphCardPaddings.vert};
  padding-left: ${themeSizes.graphCardPaddings.hor};
  padding-right: ${themeSizes.graphCardPaddings.hor};
  ${({ $marginTop }) =>
    $marginTop &&
    css`
      margin-top: ${$marginTop};
    `}
`;
