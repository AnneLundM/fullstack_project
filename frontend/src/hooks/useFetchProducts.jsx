import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  // Get all products
  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/products");
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      setError("Der skete en fejl", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create product
  const createProduct = async (productData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
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
  const refetchProducts = () => {
    fetchProducts();
  };

  // Update product
  const updateProduct = async (productData) => {
    try {
      const response = await fetch(`http://localhost:3042/product`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
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

  // Delete product
  const deleteProduct = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3042/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError("Du skal være logget ind for at slette et produkt.");
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
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/product/${id}`);
      const result = await response.json();

      return result.data;
    } catch (error) {
      console.log("fejl", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProductById,
    refetchProducts,
    error,
    isLoading,
  };
};

export { useFetchProducts };
