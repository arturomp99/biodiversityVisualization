import React from "react";
import { useParams } from "react-router-dom";
import { Detail } from "src/components/detail/Detail";

export const DetailPage = () => {
  const { chartId } = useParams();

  return (
    <main>
      <Detail graphName={chartId} />
    </main>
  );
};
