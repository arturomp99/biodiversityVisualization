import styled from "styled-components";
import { navBar } from "src/data/constants";
import { themeSizes } from "src/data/theme";

export const StyledDashboardLayout = styled.div`
  height: 100vh;
  /* height: calc(100vh - ${navBar.height}); */
  padding: ${themeSizes.elementsMargins.lg} ${themeSizes.appPaddings.m};
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-auto-flow: column;
  background-color: inherit;
`;
