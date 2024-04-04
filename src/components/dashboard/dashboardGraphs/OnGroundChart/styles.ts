import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const OnGroundChartLayout = styled.div<{ isExpanded?: boolean }>`
  display: flex;
  height: 100%;
  flex-direction: ${({ isExpanded }) => (isExpanded ? "column" : "row")};
  align-items: center;
  align-content: stretch;
  gap: ${({ isExpanded }) =>
    isExpanded ? themeSizes.elementsMargins.xl : themeSizes.elementsMargins.md};
`;

export const StyledGraph = styled.div<{ isExpanded?: boolean }>`
  position: relative;
  height: ${({ isExpanded }) => (isExpanded ? "75vh" : "100%")};
  width: 100%;
`;
