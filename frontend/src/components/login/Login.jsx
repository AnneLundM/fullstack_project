import styles from "./login.module.css";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const { setEmail, setPassword, error, signIn } = useAuthContext();

  return (
    <div className={styles.container}>
      <h3>Login som admin for at få adgang til Backoffice</h3>
      <form onSubmit={signIn} className={styles.form}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type='submit'>
          Log ind
        </button>
      </form>
    </div>
  );
};

export default Login;
