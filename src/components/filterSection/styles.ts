import { themeColors, themeSizes } from "src/data/theme";
import styled from "styled-components";

export const FilterSectionContainer = styled.div`
  background-color: ${themeColors.background.color1};
  color: white;
  padding: ${themeSizes.elementsMargins.lg};
  padding-bottom: 0;
`;
