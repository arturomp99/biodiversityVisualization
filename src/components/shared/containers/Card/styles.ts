import styled from "styled-components";
import { themeColors, themeSizes } from "src/data/theme";

export const StyledGraphCard = styled.div`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  background-color: ${themeColors.card.background};
  color: ${themeColors.card.font};
  border: ${themeSizes.border.normal} solid ${themeColors.card.border};
  border-radius: ${themeSizes.borderRadius};
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-gap: calc(5px + 0.5rem);
  transition: box-shadow 0.3s ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 5px 5px 15px ${themeColors.card.shadow};
  }
`;

export const StyledFooter = styled.div`
  background-color: ${themeColors.card.footer.background};
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  max-height: ${themeSizes.cardFooter.maxHeight};
  overflow: scroll;

  & p {
    margin: 0;
  }
`;

export const StyledGraphContainer = styled.div`
  background-color: white;
  border-radius: 5px;
`;
