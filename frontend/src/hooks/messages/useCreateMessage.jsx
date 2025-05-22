import { useState } from "react";

const useCreateMessage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create message
  const createMessage = async (messageData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Fejl ved oprettelse af besked");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    createMessage,
    error,
    isLoading,
  };
};

export { useCreateMessage };
