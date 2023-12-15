import React from "react";

import { ExpandedView } from "./styles";
import { DetailLayout } from "./styles";
import { Graph } from "../shared/containers/Card";

export const Detail = (props: { graphName: string }) => {
  return (
    <DetailLayout>
      <ExpandedView>
        <Graph graphName={props.graphName} />
      </ExpandedView>
    </DetailLayout>
  );
};
