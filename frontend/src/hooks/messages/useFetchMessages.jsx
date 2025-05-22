import { useEffect, useState } from "react";
import useAuth from "../useAuth";

const useFetchMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  // Get all messages
  const fetchMessages = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Serverfejl:", data);
        return;
      }

      setMessages(data.data);
    } catch (error) {
      console.error("Netværksfejl:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update message
  const updateMessage = async (messageData) => {
    try {
      const response = await fetch(`http://localhost:3042/message`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });

      const result = await response.json();

      refetchMessages();

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Refetch
  const refetchMessages = () => {
    fetchMessages();
  };

  // Delete message
  const deleteMessage = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3042/message/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError("Du skal være logget ind for at slette et produkt.");
      }

      const result = await response.json();
      refetchMessages();
      return result;
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get by ID
  const fetchMessageById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/message/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("fejl", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    updateMessage,
    deleteMessage,
    fetchMessageById,
    refetchMessages,
    error,
    isLoading,
  };
};

export { useFetchMessages };
