import styled from "styled-components";

import Card from "../shared/Card";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Card>
        <p>Dendrogram</p>
      </Card>
      <Card>
        <p>HeatTree</p>
      </Card>
      <Card>
        <p>Timeline</p>
      </Card>
      <Card>
        <p>Lineplot</p>
      </Card>
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-auto-flow: column;
`;

export default Dashboard;
