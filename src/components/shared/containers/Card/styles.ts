import styled from "styled-components";
import { themeColors, themeSizes } from "src/data/theme";

export const StyledGraphCard = styled.div`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  background-color: ${themeColors.card.background};
  border: ${themeSizes.border.normal} solid ${themeColors.card.border};
  color: ${themeColors.card.font};
  box-shadow: 5px 5px 5px ${themeColors.card.shadow};
  border-radius: ${themeSizes.borderRadius};
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 20%;
  grid-gap: calc(5px + 0.5rem);
`;

export const StyledFooter = styled.div`
  background-color: white;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  overflow: scroll;

  & p {
    margin: 0;
  }
`;

export const StyledGraphContainer = styled.div`
  background-color: white;
  border-radius: 5px;
`;
