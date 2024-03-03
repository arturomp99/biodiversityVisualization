import { Spinner } from "@nextui-org/react";
import React from "react";

export const renderGraph = (
  graph: React.JSX.Element,
  dimensions: [number, number] | undefined
) => {
  if (!dimensions) {
    return <Spinner />;
  }

  return graph;
};
