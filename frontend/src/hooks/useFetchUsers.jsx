import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthContext();

  // Get all users
  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/users");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      setError("Der skete en fejl", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create user
  const createUser = async (userData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      });

      if (!response) {
        toast.error("Der skete en fejl.");
        throw new Error("Fejl ved oprettelse af ophold");
      }

      const result = await response.json();

      if (result.statusCode === 201) {
        toast.success(`${result.message}`);
      }

      return result;
    } catch (error) {
      console.log(error);
      toast.error(`Der skete en fejl: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch
  const refetchUsers = () => {
    fetchUsers();
  };

  // Update user
  const updateUser = async (userData) => {
    try {
      const response = await fetch(`http://localhost:3042/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      });

      if (response.status === "error") {
        console.log("fejl");
      }

      const result = await response.json();

      if (result.statusCode === 200) {
        toast.success(`${result.message}`);
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3042/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError("Du skal være logget ind for at slette et bruger.");
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get by ID
  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/user/${id}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.log("fejl", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    createUser,
    deleteUser,
    updateUser,
    fetchUserById,
    refetchUsers,
    error,
    isLoading,
  };
};

export { useFetchUsers };
