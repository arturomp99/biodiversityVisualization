import { StyledGraphCard } from "./styles";
import { GraphContainer } from "./GraphContainer";
import { CardFooter } from "./CardFooter";
import { LineChart } from "../../../graphs/LineChart/LineChart";

const GraphCard = (props) => {
  return (
    <StyledGraphCard>
      <GraphContainer>
        <LineChart />
      </GraphContainer>
      <CardFooter graphData={props.graph} />
    </StyledGraphCard>
  );
};

export default GraphCard;
