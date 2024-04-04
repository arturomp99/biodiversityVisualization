import React from "react";
import { useNavigate } from "react-router-dom";
import { DetailHeaderStyled, ExpandedView, GraphDetailsView } from "./styles";
import { DetailLayout } from "./styles";
import { Graph } from "../shared/containers/Card";
import { GraphDetails } from "./GraphDetails";
import { Button } from "@nextui-org/react";
import { BackIcon } from "src/icons";
import { DetailInteractionContextProvider } from "src/contexts/detailInteractionContext";

export const Detail = (props: { graphName: string }) => {
  const navigate = useNavigate();
  return (
    <div>
      <DetailHeaderStyled>
        <Button
          color="success"
          variant="light"
          className="text-black"
          startContent={<BackIcon />}
          onPress={() => {
            navigate("../Dashboard");
          }}
        >
          Back to dashboard
        </Button>
      </DetailHeaderStyled>
      <DetailLayout>
        <DetailInteractionContextProvider>
          <ExpandedView>
            <Graph graphName={props.graphName} expanded />
          </ExpandedView>
          <GraphDetailsView graphName={props.graphName}>
            <GraphDetails graphName={props.graphName} />
          </GraphDetailsView>
        </DetailInteractionContextProvider>
      </DetailLayout>
    </div>
  );
};
