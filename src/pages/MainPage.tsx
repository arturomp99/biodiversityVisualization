import React from "react";
import styled from "styled-components";
import { Welcome } from "src/components/homePage/Welcome";
import { Totals } from "src/components/homePage/Totals";
import { Spacer } from "@nextui-org/react";
import { About } from "src/components/homePage/About";

const WelcomeImage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("/assets/homepage_background.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;

export const MainPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <WelcomeImage />
      <Welcome />
      <Totals />
    </div>
  );
};
