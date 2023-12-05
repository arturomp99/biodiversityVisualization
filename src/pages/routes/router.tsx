import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "src/components/dashboard/Dashboard";
import { ErrorPage } from "../ErrorPage";
import { DetailPage } from "../DetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "detail/:chartId",
    element: <DetailPage />,
  },
]);
