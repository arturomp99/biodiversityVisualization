import { StyledFooter } from "./styles";

export const CardFooter = (props) => {
  return (
    <StyledFooter>
      <p>{props.graphData.title}</p>
      <p>{props.graphData.description}</p>
    </StyledFooter>
  );
};
