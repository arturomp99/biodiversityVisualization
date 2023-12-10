import React from "react";

import { ExpandedView } from "./styles";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import { DetailLayout } from "./styles";

export const Detail = (props: { graphName: string | undefined }) => {
  return (
    <DetailLayout>
      <ExpandedView>{useGetGraph(props.graphName)}</ExpandedView>
    </DetailLayout>
  );
};
