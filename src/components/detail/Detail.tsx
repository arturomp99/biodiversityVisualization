import React from "react";
import { useNavigate } from "react-router-dom";
import { DetailHeaderStyled, ExpandedView, GraphDetailsView } from "./styles";
import { DetailLayout } from "./styles";
import { Graph } from "../shared/containers/Card";
import { GraphDetails } from "./GraphDetails";
import { Button } from "@nextui-org/react";
import { BackIcon } from "src/icons";

export const Detail = (props: { graphName: string }) => {
  const navigate = useNavigate();
  return (
    <div>
      <DetailHeaderStyled>
        <Button
          variant="ghost"
          startContent={<BackIcon />}
          onPress={() => {
            navigate("../Dashboard");
          }}
        >
          Back to dashboard
        </Button>
      </DetailHeaderStyled>
      <DetailLayout>
        <ExpandedView>
          <Graph graphName={props.graphName} expanded />
        </ExpandedView>
        <GraphDetailsView graphName={props.graphName}>
          <GraphDetails graphName={props.graphName} />
        </GraphDetailsView>
      </DetailLayout>
    </div>
  );
};
