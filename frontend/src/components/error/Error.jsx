import styles from "./error.module.css";

const Error = ({ error }) => {
  return (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  );
};

export default Error;
