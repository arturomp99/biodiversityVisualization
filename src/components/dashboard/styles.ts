import styled from "styled-components";
import { themeColors } from "src/data/theme";
import { navBar } from "src/data/constants";
import { themeSizes } from "src/data/theme";

export const StyledDashboardLayout = styled.div`
  height: calc(100vh - ${navBar.height});
  padding: 1rem ${themeSizes.appPaddings.m};
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-auto-flow: column;
  background-color: ${themeColors.background};
  gap: 1rem 2rem;
`;
