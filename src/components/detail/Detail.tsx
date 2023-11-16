import React, { useState, useEffect } from "react";

import { ExpandedView, OptionView } from "./styles";
import { graphsMetadata } from "../../data";
import { GraphDataType } from "../../data/graphs.types";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import { useGetExpandedGraphs } from "./useGetExpandedGraphs";
import { DetailLayout, ExpandedLayout, OptionLayout } from "./styles";

export const Detail = () => {
  // TODO: BY DEFAULT, FIRST ITEM IS SELECTED. DELETE WHEN ROUTING IS IMPLEMENTED
  const [metaData, setMetadata] = useState<GraphDataType[]>([]);
  useEffect(() => {
    const defaultMetadata = graphsMetadata.data.map((itemData, index) => ({
      ...itemData,
      expanded: index === 0 ? true : false,
    }));
    setMetadata(defaultMetadata);
  }, []);
  // TODO:

  const { expandedGraphs, optionGraphs } = useGetExpandedGraphs(metaData);

  return (
    <DetailLayout>
      <ExpandedLayout>
        {expandedGraphs.map((graphName, i) => (
          <ExpandedView key={`expanded${i}`}>
            {useGetGraph(graphName)}
          </ExpandedView>
        ))}
      </ExpandedLayout>
      <OptionLayout>
        {optionGraphs.map((graphName, i) => (
          <OptionView key={`option${i}`}>{useGetGraph(graphName)}</OptionView>
        ))}
      </OptionLayout>
    </DetailLayout>
  );
};
