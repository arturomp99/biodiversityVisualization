import styled from "styled-components";

export const StyledGraphCard = styled.div`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  background-color: #014751;
  border: 5px solid #014751;
  color: black;
  box-shadow: 5px 5px 5px black;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 20%;
  grid-gap: calc(5px + 0.5rem);
`;

export const StyledFooter = styled.div`
  background-color: white;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  overflow: scroll;

  & p {
    margin: 0;
  }
`;

export const StyledGraphContainer = styled.div`
  background-color: white;
  border-radius: 5px;
`;
