import React from "react";
import { useNavigate } from "react-router-dom";
import { DetailHeaderStyled, ExpandedView } from "./styles";
import { DetailLayout } from "./styles";
import { Graph } from "../shared/containers/Card";
import { GraphDetails } from "./GraphDetails";
import { Button } from "@nextui-org/react";
import { BackIcon } from "src/icons";
import { DetailInteractionContextProvider } from "src/contexts/detailInteractionContext";
import { DashboardGraphName } from "../dashboard/dashboardGraphs/DashboardGraph";
import { useShowCatalogDetail } from "./GraphDetails/Interactivtity/useShowCatalogDetail";
import { TimeLineGraph } from "../graphs/TimeLine/TimeLineGraph";

export const Detail = (props: { graphName: string }) => {
  const navigate = useNavigate();
  const { catalogScientificNames, showCatalogHandler } = useShowCatalogDetail();

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
          <ExpandedView
            isOnGroundChart={props.graphName === DashboardGraphName.ONGROUND}
          >
            {props.graphName === DashboardGraphName.TIMELINE ? (
              <TimeLineGraph title={props.graphName} expanded />
            ) : (
              <Graph
                graphName={props.graphName}
                expanded
                showCatalogHandler={showCatalogHandler}
              />
            )}
          </ExpandedView>
          <GraphDetails
            graphName={props.graphName}
            detailProps={{ catalogScientificNames, showCatalogHandler }}
          />
        </DetailInteractionContextProvider>
      </DetailLayout>
    </div>
  );
};
