import styled from "styled-components";
import { navBar } from "src/data/constants";
import { themeSizes } from "src/data/theme";

export const StyledDashboardLayout = styled.div`
  height: 100vh;
  /* height: calc(100vh - ${navBar.height}); */
  padding-top: ${themeSizes.elementsMargins.lg};
  padding-bottom: ${themeSizes.elementsMargins.lg};
  padding-left: ${themeSizes.appPaddings.xs};
  padding-right: ${themeSizes.appPaddings.md};
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-auto-flow: column;
  background-color: inherit;
`;
