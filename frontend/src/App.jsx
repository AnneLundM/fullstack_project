import { useRoutes } from "react-router-dom";
import Login from "./components/login/Login";
import Products from "./pages/Products";
import Backoffice from "./pages/backoffice/Backoffice";
import Home from "./pages/Home";
import Navigation from "./components/navigation/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
      <Navigation />

      <div className='main'>{routes}</div>

      {/* Vis toast globalt når den kaldes */}
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
        toastClassName='custom-toast'
      />
    </div>
  );
}

export default App;
