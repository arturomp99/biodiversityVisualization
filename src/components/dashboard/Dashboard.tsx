import React from "react";

import GraphCard from "../shared/containers/Card/GraphCard";
import { DashboardLayout } from "./styles";
import { graphs } from "../../data";
import { GraphDataType } from "../../data/graphs.types";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {graphs.data.map((elementGraph: GraphDataType, i: number) => {
        return <GraphCard graph={elementGraph} key={i} />;
      })}
    </DashboardLayout>
  );
};

export default Dashboard;
