import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routes/router";
import { DataContextProvider } from "./contexts/dataContext";
import "tippy.js/dist/tippy.css";

function App() {
  return (
    <DataContextProvider>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </DataContextProvider>
  );
}

export default App;
