import GraphCard from "../shared/containers/Card/GraphCard";
import { DashboardLayout } from "./styles";
import { graphs } from "../../data";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {graphs.data.map((elementGraph) => {
        return <GraphCard graph={elementGraph} />;
      })}
    </DashboardLayout>
  );
};

export default Dashboard;
