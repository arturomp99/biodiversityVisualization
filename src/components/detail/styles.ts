import styled from "styled-components";
import { detailGridAreas } from "src/data/layoutsConstants";
import { navBar } from "src/data/constants";

export const DetailLayout = styled.div`
  height: calc(100vh - ${navBar.height});
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 9fr 3fr;
  grid-template-areas:
    "${detailGridAreas.expanded} ${detailGridAreas.expanded}"
    "${detailGridAreas.detail} ${detailGridAreas.kpi}";
`;

export const ExpandedView = styled.div`
  grid-area: ${detailGridAreas.expanded};
  height: 100%;
`;
