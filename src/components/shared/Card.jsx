import styled from "styled-components";

const Card = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

const StyledCard = styled.div`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  background-color: white;
  box-shadow: 5px 5px 5px black;
  border-radius: 5px;
`;

export default Card;
