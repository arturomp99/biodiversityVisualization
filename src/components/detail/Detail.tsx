import React, { useState, useEffect } from "react";

import {
  ExpandedView,
  OptionView,
  StyledExpandedLayout,
  StyledOptionLayout,
} from "./styles";
import { graphsMetadata } from "../../data";
import { GraphDataType } from "../../data/graphs.types";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import { useGetExpandedGraphs } from "./useGetExpandedGraphs";
import { DetailLayout } from "./styles";

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

  const OptionClickHandler = (clickedGraphName: string) => {
    setMetadata((prevMetaData) => {
      const newMetaData = prevMetaData.map((itemData) => {
        return {
          ...itemData,
          expanded:
            itemData.title === clickedGraphName
              ? true
              : itemData.title === expandedGraphs[0]
              ? false
              : itemData.expanded,
        };
      });
      return newMetaData;
    });
  };

  return (
    <DetailLayout>
      <StyledExpandedLayout>
        {expandedGraphs.map((graphName, i) => (
          <ExpandedView key={`expanded${i}`}>
            {useGetGraph(graphName)}
          </ExpandedView>
        ))}
      </StyledExpandedLayout>
      <StyledOptionLayout>
        {optionGraphs.map((graphName, i) => (
          <OptionView
            key={`option${i}`}
            onClick={() => OptionClickHandler(graphName)}
          >
            {useGetGraph(graphName)}
          </OptionView>
        ))}
      </StyledOptionLayout>
    </DetailLayout>
  );
};
