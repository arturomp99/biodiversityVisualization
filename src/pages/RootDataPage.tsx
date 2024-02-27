import React from "react";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { FilterSection } from "src/components/filterSection/FilterSection";
import { FilterForm } from "src/components/filterForm/FilterForm";

const RootDataPageLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
`;

export const RootDataPage = () => {
  return (
    <>
      <main className="light">
        <FilterSection />
        <RootDataPageLayout>
          <FilterForm />
          <Outlet />
        </RootDataPageLayout>
      </main>
    </>
  );
};
