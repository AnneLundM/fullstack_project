import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Login from "./login/Login";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <>
        <h4 className='unauthorized'>Du har ikke adgang til denne side..</h4>
        <Login />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
