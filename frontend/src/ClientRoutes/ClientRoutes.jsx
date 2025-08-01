import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard } from "../Pages/AdminDashboard/AdminDashboard";
import CreateAgent from "../Pages/CreateAgent/CreateAgent";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import UploadTasks from "../Pages/UploadTasks/UploadTasks";
import { AgentsTasks } from "../Pages/AgentTasks/AgentsTasks";
import { useSelector } from "react-redux";
import { UnauthorizedAccess } from "../Pages/UnauthorizedAccess/UnauthorizedAccess";

function ProtectAgentRoutes({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (isLoggedIn && user.role === "agent") {
    return children;
  } else if (isLoggedIn && user.role === "admin") {
    return <Navigate to="/unauthorized-access" />;
  }

  // return <Navigate to="/" />;
}

function ProtectAdminRoutes({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (isLoggedIn && user.role === "admin") {
    return children;
  } else if (isLoggedIn && user.role === "agent") {
    return <Navigate to="/unauthorized-access" />;
  }

  return <Navigate to="/" />;
}

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/unauthorized-access" element={<UnauthorizedAccess />} />

      <Route
        path="/agent/tasks"
        element={
          <ProtectAgentRoutes>
            <AgentsTasks />
          </ProtectAgentRoutes>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectAdminRoutes>
            <AdminDashboard />
          </ProtectAdminRoutes>
        }
      />
      <Route
        path="/admin/create-agent"
        element={
          <ProtectAdminRoutes>
            <CreateAgent />
          </ProtectAdminRoutes>
        }
      />
      <Route
        path="/admin/upload-tasks"
        element={
          <ProtectAdminRoutes>
            <UploadTasks />
          </ProtectAdminRoutes>
        }
      />
      <Route
        path="/admin/agents/:agentId/tasks"
        element={
          <ProtectAdminRoutes>
            <AgentsTasks />
          </ProtectAdminRoutes>
        }
      />
    </Routes>
  );
}
