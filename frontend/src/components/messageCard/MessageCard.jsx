import { useState } from "react";
import styles from "./messageCard.module.css";
import { useFetchMessages } from "../../hooks/useFetchMessages";
import { GoRead, GoUnread } from "react-icons/go";
import Swal from "sweetalert2";

const MessageCard = ({ message, onMessageCreated }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { updateMessage, deleteMessage } = useFetchMessages();

  const handleReadMessage = async () => {
    setShowMessage(!showMessage);

    if (!message.isRead) {
      await updateMessage({
        id: message._id,
        isRead: true,
      });

      onMessageCreated();
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const result = await Swal.fire({
        title: "Er du sikker?",
        text: "Du er ved at slette denne besked.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ja, slet",
        cancelButtonText: "Annullér",
      });

      if (result.isConfirmed) {
        await deleteMessage(messageId);

        await onMessageCreated();

        await Swal.fire({
          title: "Slettet!",
          text: "Beskeden er blevet slettet.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Der opstod en fejl ved sletning:", error);
      Swal.fire("Fejl!", "Noget gik galt under sletning.", "error");
    }
  };

  return (
    <li className={styles.messageCard}>
      {message.isRead ? <GoRead /> : <GoUnread />}
      <div className={styles.column}>
        <p>Fra: {message.name}</p>
        <p>Emne: {message.subject}</p>
        {showMessage && <p>Besked: {message.message}</p>}
        {message.isRead && (
          <span>
            Læst d. {new Date(message.updatedAt).toLocaleDateString("da-DK")}
          </span>
        )}
      </div>
      <div className={styles.column}>
        <button onClick={handleReadMessage}>Læs mere</button>
        <button onClick={() => handleDeleteMessage(message._id)}>Slet</button>
      </div>
    </li>
  );
};

export default MessageCard;
