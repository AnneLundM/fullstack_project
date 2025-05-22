import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <>
        <h4 className='unauthorized'>
          Du skal have admin-adgang for at se denne side..
        </h4>
        <Link to='/login'>Log ind her</Link>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
