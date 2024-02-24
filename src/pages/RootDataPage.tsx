import React from "react";
import { Outlet } from "react-router-dom";
import { FilterSection } from "src/components/filterSection/FilterSection";

export const RootDataPage = () => {
  return (
    <>
      <main className="light">
        <FilterSection />
        <Outlet />
      </main>
    </>
  );
};
