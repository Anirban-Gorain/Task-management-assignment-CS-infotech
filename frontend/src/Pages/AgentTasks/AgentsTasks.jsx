import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../api";

export const AgentsTasks = () => {
  const { agentId } = useParams();
  const [tasks, setTasks] = useState([]);
  const { pathname } = useLocation();

  console.log(pathname);

  useEffect(() => {
    const getAllTasks = async () => {
      let response;

      if (pathname === "/agent/tasks") {
        console.log("here");
        response = await api.get("/agent/tasks");
      } else {
        response = await api.get(`/admin/agents/${agentId}/tasks`);
      }

      setTasks(response.data.tasks);
    };

    getAllTasks();
  }, []);

  console.log(tasks);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task List</h2>

      <div className="overflow-x-auto rounded-lg ">
        <table className="min-w-full table-fixed bg-white  ">
          <thead className="text-gray-700 bg-gray-200">
            <tr>
              <th className="w-12 px-4 py-3 text-left border-b">#</th>
              <th className="w-1/4 px-4 py-3 text-left border-b">Task Name</th>
              <th className="w-1/4 px-4 py-3 text-left border-b">
                Phone Number
              </th>
              <th className="w-1/2 px-4 py-3 text-left border-b">Notes</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-4 py-3 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border-b truncate">
                    {task.first_name}
                  </td>
                  <td className="px-4 py-3 border-b">{task.phone}</td>
                  <td className="px-4 py-3 border-b">{task.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
