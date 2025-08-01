import { Navbar } from "./Components/Navbar/Navbar";
import ClientRoutes from "./ClientRoutes/ClientRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginUsingToken } from "./state/features/auth.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { user, isLoggedIn, loading, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  console.log(user, isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(loginUsingToken());
  }, []);

  useEffect(() => {
    if (isLoggedIn && user.role === "admin") {
      navigate("/admin");
    } else if (isLoggedIn && user.role === "agent") {
      navigate("/agent/tasks");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar role={user?.role} isLoggedIn={isLoggedIn} />
      <ClientRoutes />
    </>
  );
}

export default App;
