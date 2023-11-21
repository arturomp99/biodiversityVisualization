import styled from "styled-components";
import { detailGridAreas } from "src/data/layoutsConstants";

export const DetailLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 9fr 3fr;
  grid-template-areas:
    "${detailGridAreas.expanded} ${detailGridAreas.options}"
    "${detailGridAreas.detail} ${detailGridAreas.kpi}";
`;

export const StyledExpandedLayout = styled.div`
  grid-area: ${detailGridAreas.expanded};
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export const StyledOptionLayout = styled.div`
  grid-area: ${detailGridAreas.options};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(1fr, 3);
  grid-template-areas:
    "${detailGridAreas.options}1"
    "${detailGridAreas.options}2"
    "${detailGridAreas.options}3";
`;

export const ExpandedView = styled.div`
  height: 100%;
`;

export const OptionView = styled.div``;
