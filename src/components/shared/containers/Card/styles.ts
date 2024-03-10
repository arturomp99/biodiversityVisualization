import styled, { css } from "styled-components";
import { themeColors, themeFont, themeSizes } from "src/data/theme";

export const StyledGraphCard = styled.div<{
  $noBorder?: boolean;
  $hasTitle?: boolean;
}>`
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: inherit;
  color: ${themeColors.card.font};
  display: grid;
  grid-template-columns: 1fr;
  ${({ $hasTitle }) =>
    $hasTitle
      ? css`
          grid-template-rows: auto 1fr;
        `
      : css`
          grid-template-rows: 1fr;
        `}
  grid-gap: calc(5px + 0.5rem);
  transition: box-shadow 0.3s ease-in-out;

  ${({ $noBorder }) =>
    !$noBorder &&
    css`
      border: ${themeSizes.border.thin} solid ${themeColors.card.border};
      &:hover,
      &:focus {
        box-shadow: 5px 5px 15px ${themeColors.card.shadow};
        z-index: 10;
      }
    `};
`;

export const GraphCardHeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${themeSizes.elementsMargins.md};
  align-items: center;
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

export const StyledGraphTitle = styled.p`
  font-size: ${themeFont.h3.size};
  font-weight: ${themeFont.h3.weight};
`;
