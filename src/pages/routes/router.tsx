import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, ErrorPage, DetailPage, MainPage, RootPage } from "..";
//TODO: Add loader

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/Dashboard",
        element: <DashboardPage />,
      },
      {
        path: "Detail/:chartId",
        element: <DetailPage />,
      },
    ],
  },
]);
