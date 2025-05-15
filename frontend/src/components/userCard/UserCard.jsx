import useAuth from "../../hooks/useAuth";
import styles from "./userCard.module.css";

const UserCard = () => {
  const { signOut, user } = useAuth();

  return (
    <figure className={styles.userCard}>
      <h3>
        Logget ind som
        <p>
          {user.name} - {user.role}
        </p>
      </h3>
      {user.image && <img src={user.image} alt={user.name} />}

      <button className={styles.button} onClick={() => signOut()}>
        Log ud
      </button>
    </figure>
  );
};

export default UserCard;
