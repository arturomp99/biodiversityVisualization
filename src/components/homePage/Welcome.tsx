import React from "react";
import styled, { css } from "styled-components";
import { themeFont } from "src/data/theme";

const StyledContainer = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: row;
  padding-left: 12rem;
  align-items: center;
`;

const StyledTitle1 = styled.p<{ marginLeft?: string }>`
  color: white;
  font-size: 110px;
  font-weight: ${themeFont.h1.weight};
  text-shadow: 0.3rem 0.1rem 1rem black;
  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: ${marginLeft};
    `};
`;

const StyledTitle2 = styled.p<{ marginLeft?: string; marginTop?: string }>`
  color: white;
  font-size: 50px;
  font-weight: ${themeFont.h3.weight};
  text-shadow: 0.3rem 0.1rem 1rem black;
  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: ${marginLeft};
    `}
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${marginTop};
    `};
`;

export const Welcome = () => {
  return (
    <StyledContainer>
      <div>
        <StyledTitle1>Providence +</StyledTitle1>
        {/* <div className="flex flex-col items-center gap-{size}"> */}
        <StyledTitle2 marginLeft="16rem" marginTop="2rem">
          XPRIZE Rainforest
        </StyledTitle2>
        <StyledTitle2 marginLeft="40rem" marginTop="-1rem">
          Semifinals
        </StyledTitle2>
      </div>
    </StyledContainer>
  );
};
