import React from "react";
import { themeColors, themeFont, themeSizes } from "src/data/theme";
import styled from "styled-components";

const StyledSection = styled.section`
  background-color: ${themeColors.background.color3};
  width: calc(100% - 2 * 10vw);
  margin: 0 10vw;
  padding: ${themeSizes.appPaddings.md} 0;
  border-radius: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${themeSizes.elementsMargins.md};
`;

const StyledTitle = styled.p`
  font-size: ${themeFont.h2.size};
  font-weight: ${themeFont.h2.weight};
  color: white;
`;

const StyledHr = styled.hr`
  width: 66%;
`;

export const About = () => {
  return (
    <StyledSection>
      <StyledTitle>The project</StyledTitle>
      <StyledHr />
    </StyledSection>
  );
};
