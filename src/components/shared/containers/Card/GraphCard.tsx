import React from "react";
import { StyledGraphCard } from "./styles";
import { GraphContainer } from "./GraphContainer";
import { CardFooter } from "./CardFooter";
// import { LineChart } from "../../../graphs/LineChart/LineChart";
import { TimeLine } from "src/components/graphs/TimeLine/TimeLine";
import { GraphDataType } from "../../../../data/graphs.types";

const GraphCard = (props: { graph: GraphDataType }) => {
  return (
    <StyledGraphCard>
      <GraphContainer>
        <TimeLine />
      </GraphContainer>
      <CardFooter graphData={props.graph} />
    </StyledGraphCard>
  );
};

export default GraphCard;
