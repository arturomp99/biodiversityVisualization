/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./pages/routes/router";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<RouterProvider router={router} />);
