import React from "react";
import { Outlet } from "react-router-dom";
import { FilterSection } from "src/components/filterSection/FilterSection";

import { NavBar } from "src/components/navbar/NavBar";
export const RootPage = () => {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main className="light">
        <FilterSection />
        <Outlet />
      </main>
    </>
  );
};
