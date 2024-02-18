import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, ErrorPage, DetailPage, MainPage, RootPage } from "..";
import { CatalogPage } from "../CatalogPage";
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
      {
        path: "Catalog",
        element: <CatalogPage />,
      },
    ],
  },
]);
