import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "src/components/navbar/NavBar";
export const RootPage = () => {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main className="light mt-16">
        <Outlet />
      </main>
    </>
  );
};
