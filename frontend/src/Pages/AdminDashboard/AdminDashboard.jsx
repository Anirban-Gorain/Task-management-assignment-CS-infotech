import React, { useEffect, useState } from "react";
import AgentCard from "../../Components/AgentCard/AgentCard";
import api from "../../api";

export const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const getAgent = async () => {
      const response = await api.get("/admin/agents");

      setAgents(response.data.agents);
    };

    getAgent();
  }, []);

  console.log(agents);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1 className="text-2xl font-semibold mb-4">
        {agents.length > 0 ? "Your Agents" : "Create Agents"}
      </h1>

      {agents.map((agent, index) => (
        <AgentCard
          key={index}
          name={agent.name}
          email={agent.email}
          contact={agent.contact_number}
          agentId={agent._id}
        />
      ))}
    </div>
  );
};
