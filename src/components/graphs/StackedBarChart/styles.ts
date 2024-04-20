import styled, { css } from "styled-components";

export const StyledBarChartContainer = styled.svg<{ height?: number }>`
  width: 100%;
  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : "100%"};
    `}
`;
