import { detailGridAreas } from "src/data/layoutsConstants";
import styled, { css } from "styled-components";

export const StyledGraphDetails = styled.div<{ graphName: string }>`
  grid-area: ${detailGridAreas.detail};
  ${({ graphName }) => {
    console.log("details:", graphName);
    return css``;
  }};
`;
