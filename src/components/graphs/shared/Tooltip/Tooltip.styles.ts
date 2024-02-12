import { styled, css } from "styled-components";

export const TooltipWrapper = styled.div<{
  isVisible: boolean;
  renderingPosition: [number, number];
}>`
  position: fixed;
  ${({ isVisible }) =>
    css`
      opacity: ${isVisible ? 1 : 0};
    `};
  ${({ renderingPosition }) =>
    css`
      top: ${renderingPosition[0]};
      left: ${renderingPosition[1]};
    `}
`;
