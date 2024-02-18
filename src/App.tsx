import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routes/router";
import { DataContextProvider } from "./contexts/dataContext";
import "tippy.js/dist/tippy.css";
import { FiltersContextProvider } from "./contexts/filtersContext";

function App() {
  return (
    <NextUIProvider>
      <FiltersContextProvider>
        <DataContextProvider>
          <div className="app">
            <RouterProvider router={router} />
          </div>
        </DataContextProvider>
      </FiltersContextProvider>
    </NextUIProvider>
  );
}

export default App;
