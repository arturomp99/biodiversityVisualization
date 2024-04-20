import { themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledDetailChart = styled.div`
  height: 40vh;
  padding-top: ${themeSizes.graphCardPaddings.vert};
  padding-bottom: ${themeSizes.graphCardPaddings.vert};
  padding-left: ${themeSizes.graphCardPaddings.hor};
  padding-right: ${themeSizes.graphCardPaddings.hor};
`;
