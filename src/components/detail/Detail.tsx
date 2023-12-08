import React from "react";

import { ExpandedView } from "./styles";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import { DetailLayout } from "./styles";

export const Detail = (props: { graphName: string }) => {
  return (
    <DetailLayout>
      <ExpandedView>{useGetGraph(props.graphName)}</ExpandedView>
    </DetailLayout>
  );
};
