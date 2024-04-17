import styled, { css } from "styled-components";
import { navBar } from "src/data/constants";
import { themeSizes } from "src/data/theme";
import { dashboardAreas } from "src/data/layoutsConstants";
import { DashboardGraphName } from "./dashboardGraphs/DashboardGraph";

export const StyledDashboardLayout = styled.div`
  height: 100vh;
  /* height: calc(100vh - ${navBar.height}); */
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-bottom: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-template-areas:
    "${dashboardAreas.dendrogram} ${dashboardAreas.timeline}"
    "${dashboardAreas.onground}   ${dashboardAreas.onground}";
  grid-auto-flow: column;
  background-color: inherit;
  gap: 3rem;
`;

export const StyledDashboardGraph = styled.div<{ $graphId: string }>`
  ${({ $graphId }) => {
    if ($graphId === DashboardGraphName.DENDROGRAM) {
      return css`
        grid-area: ${dashboardAreas.dendrogram};
      `;
    }
    if ($graphId === DashboardGraphName.TIMELINE) {
      return css`
        grid-area: ${dashboardAreas.timeline};
      `;
    }
    if ($graphId === DashboardGraphName.ONGROUND) {
      return css`
        grid-area: ${dashboardAreas.onground};
      `;
    }
  }}
`;
