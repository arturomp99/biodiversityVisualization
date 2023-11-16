import styled from "styled-components";
import { themeColors } from "src/data/theme";

export const StyledDashboardLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-auto-flow: column;
  background-color: ${themeColors.background};
`;
