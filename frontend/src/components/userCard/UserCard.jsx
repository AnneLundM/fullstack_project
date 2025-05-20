import { useState } from "react";
import UserForm from "../forms/UserForm";
import styles from "./userCard.module.css";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import Swal from "sweetalert2";
import FadeWrapper from "../../styles/FadeWrapper";

const UserCard = ({ user, onUserCreated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteUser, error } = useFetchUsers();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Er du sikker?",
        text: "Du er ved at slette dette bruger.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ja, slet",
        cancelButtonText: "Annullér",
      });

      if (result.isConfirmed) {
        await deleteUser(userId);

        onUserCreated();

        await Swal.fire({
          title: "Slettet!",
          text: "Brugeret er blevet slettet.",
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
    <>
      {isEditing ? (
        <FadeWrapper keyName='form'>
          <UserForm
            onUserCreated={onUserCreated}
            isEditMode={true}
            id={user._id}
            showForm={handleEditClick}
          />
        </FadeWrapper>
      ) : (
        <FadeWrapper keyName='card'>
          <li className={styles.card}>
            <h2>{user.name}</h2>
            {user.image && <img alt={user.name} src={user.image} />}

            <div className={styles.buttons}>
              <button onClick={handleEditClick}>Redigér</button>
              <button onClick={() => handleDelete(user._id)}>Slet</button>
            </div>

            {error && <h5 className='error'>{error}</h5>}
          </li>
        </FadeWrapper>
      )}
    </>
  );
};

export default UserCard;
