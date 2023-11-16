import { useEffect, useState } from "react";
import { GraphDataType } from "src/data/graphs.types";

export const useGetExpandedGraphs = (graphsData: GraphDataType[]) => {
  const [expandedGraphs, setExpandedGraphs] = useState<string[]>([]);
  const [optionGraphs, setOptionGraphs] = useState<string[]>([]);

  useEffect(() => {
    const newExpandedGraphs: string[] = [];
    const newOptionGraphs: string[] = [];
    graphsData.forEach((singleGraph) =>
      singleGraph.expanded
        ? newExpandedGraphs.push(singleGraph.title)
        : newOptionGraphs.push(singleGraph.title)
    );
    setExpandedGraphs(newExpandedGraphs);
    setOptionGraphs(newOptionGraphs);
  }, [graphsData]);

  return { expandedGraphs, optionGraphs };
};
