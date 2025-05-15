import { useState } from "react";
import styles from "./messageCard.module.css";
import { useFetchMessages } from "../../hooks/useFetchMessages";
import { GoRead, GoUnread } from "react-icons/go";
import Swal from "sweetalert2";

const MessageCard = ({ message, onMessageCreated }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { updateMessage, deleteMessage } = useFetchMessages();

  // Læs besked
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

  // Slet besked
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
          timer: 1000,
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
      <div className={styles.column}>
        <div className={styles.isRead}>
          {message.isRead ? <GoRead size={20} /> : <GoUnread size={20} />}
          <div className={styles.text}>
            <p>
              <b>Fra: </b>
              {message.name}
            </p>
            <p>
              <b>Emne:</b> {message.subject}
            </p>
            {message.isRead && (
              <span>
                Læst d.{" "}
                {new Date(message.updatedAt).toLocaleDateString("da-DK")}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleReadMessage}>Læs</button>
        <button onClick={() => handleDeleteMessage(message._id)}>Slet</button>
      </div>
      {showMessage && (
        <div className={styles.message}>
          <p>
            <b>Besked:</b>
            <span>{message.message}</span>
          </p>
        </div>
      )}
    </li>
  );
};

export default MessageCard;
