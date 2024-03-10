import styled, { css } from "styled-components";
import { detailGridAreas } from "src/data/layoutsConstants";

export const DetailLayout = styled.div`
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "${detailGridAreas.expanded} ${detailGridAreas.expanded}"
    "${detailGridAreas.detail} ${detailGridAreas.kpi}";
`;

export const ExpandedView = styled.div`
  grid-area: ${detailGridAreas.expanded};
  height: 75vh;
`;

export const GraphDetailsView = styled.div<{ graphName: string }>`
  grid-area: ${detailGridAreas.detail};
  ${({ graphName }) => {
    console.log("details:", graphName);
    return css``;
  }};
`;
