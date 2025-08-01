import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AgentCard = ({ name, email, contact, agentId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Contact:</span> {contact}
      </p>
      <button
        onClick={() => navigate(`/admin/agents/${agentId}/tasks`)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Tasks
      </button>
    </div>
  );
};

export default AgentCard;
