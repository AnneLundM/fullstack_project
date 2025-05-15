import { useRoutes } from "react-router-dom";
import Login from "./components/login/Login";
import useAuth from "./hooks/useAuth";
import Products from "./pages/Products";
import Backoffice from "./pages/backoffice/Backoffice";
import Home from "./pages/Home";
import UserCard from "./components/userCard/UserCard";
import Navigation from "./components/navigation/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { signedIn } = useAuth();
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },

    /* Backoffice kan kun tilgås for brugere med admin-rolle */
    {
      path: "/backoffice",
      element: (
        <ProtectedRoute requiredRole='admin'>
          <Backoffice />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div className='app'>
      {signedIn && <UserCard />}

      <Navigation />
      <div className='main'>{routes}</div>

      {/* Vis toast globalt når den kaldes */}
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        toastClassName='custom-toast'
      />
    </div>
  );
}

export default App;
