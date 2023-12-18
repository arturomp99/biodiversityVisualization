import React from "react";
import { useParams } from "react-router-dom";
import { Detail } from "src/components/detail/Detail";

export const DetailPage = () => {
  const { chartId } = useParams();

  if (!chartId) {
    return (
      <main>
        <h1>WRONG URL, GO BACK TO DASHBOARD</h1>
      </main>
    );
  }

  return (
    <main>
      <Detail graphName={chartId} />
    </main>
  );
};
