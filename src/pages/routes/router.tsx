import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, ErrorPage, DetailPage, MainPage, RootPage } from "..";
import { CatalogPage } from "../CatalogPage";
import { RootDataPage } from "../RootDataPage";
//TODO: Add loader

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/data",
        element: <RootDataPage />,
        children: [
          {
            path: "Dashboard",
            element: <DashboardPage />,
          },
          {
            path: "Detail/:chartId",
            element: <DetailPage />,
          },
          {
            path: "Catalog",
            element: <CatalogPage />,
          },
        ],
      },
    ],
  },
]);
