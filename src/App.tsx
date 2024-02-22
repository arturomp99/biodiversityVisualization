import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routes/router";
import { DataContextProvider } from "./contexts/dataContext";
import "tippy.js/dist/tippy.css";
import { FiltersContextProvider } from "./contexts/filtersContext";
import styled from "styled-components";
import { themeColors } from "./data/theme";

const StyledApp = styled.div`
  background-color: ${themeColors.background.color1};
`;

function App() {
  return (
    <NextUIProvider>
      <FiltersContextProvider>
        <DataContextProvider>
          <StyledApp>
            <RouterProvider router={router} />
          </StyledApp>
        </DataContextProvider>
      </FiltersContextProvider>
    </NextUIProvider>
  );
}

export default App;
