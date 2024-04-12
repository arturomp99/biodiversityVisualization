import React from "react";
import styled from "styled-components";
import { StyledTitle } from "../detail/GraphDetails/shared/styles";

const StyledContainer = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: url("https://media.cntraveler.com/photos/5f887b967aefd0f473d5bebb/master/pass/OCBC%20Skyway%20&%20Supertrees%20-%20Credit%20Gardens%20by%20the%20Bay.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Welcome = () => {
  return (
    <StyledContainer>
      <StyledTitle>HELLO</StyledTitle>
    </StyledContainer>
  );
};
