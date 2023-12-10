import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routes/router";

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
