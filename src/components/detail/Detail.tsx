import React from "react";

import { ExpandedView, GraphDetailsView } from "./styles";
import { DetailLayout } from "./styles";
import { Graph } from "../shared/containers/Card";
import { GraphDetails } from "./GraphDetails";

export const Detail = (props: { graphName: string }) => {
  return (
    <DetailLayout>
      <ExpandedView>
        <Graph graphName={props.graphName} expanded />
      </ExpandedView>
      <GraphDetailsView graphName={props.graphName}>
        <GraphDetails graphName={props.graphName} />
      </GraphDetailsView>
    </DetailLayout>
  );
};
