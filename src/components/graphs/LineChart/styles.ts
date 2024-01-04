import { lineChartParameters } from "src/data/constants";
import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledLegendContainer = styled.svg`
  position: absolute;
  top: 2rem;
  right: 3rem;
  padding: ${lineChartParameters.legend.margin}px;
  border-radius: 8px;
  background-color: ${lineChartParameters.legend.backgroundColor};
`;

export const StyledLineChartContainer = styled.svg`
  width: 100%;
  height: 100%;
`;
