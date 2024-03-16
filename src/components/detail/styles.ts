import styled, { css } from "styled-components";
import { detailGridAreas } from "src/data/layoutsConstants";
import { themeSizes } from "src/data/theme";

export const DetailLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "${detailGridAreas.expanded} ${detailGridAreas.expanded}"
    "${detailGridAreas.detail} ${detailGridAreas.kpi}";
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-bottom: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
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

export const DetailHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: ${themeSizes.elementsMargins.sm};
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
`;
