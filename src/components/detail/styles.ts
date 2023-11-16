import styled from "styled-components";
import { GraphContainer } from "../shared/containers/Card";
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

export const ExpandedLayout = styled.div`
  grid-area: ${detailGridAreas.expanded};
  display: flex;
`;

export const OptionLayout = styled.div`
  grid-area: ${detailGridAreas.options};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ExpandedView = styled(GraphContainer)``;

export const OptionView = styled(GraphContainer)``;
