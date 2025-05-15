import { Link } from "react-router-dom";
import styles from "./navigation.module.css";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { signedIn } = useAuth();
  return (
    <nav className={styles.nav}>
      <Link to='/'>Forside</Link>
      <Link to='/products'>Produkter</Link>
      <Link to='/backoffice'>Backoffice</Link>
      <Link to='/contact'>Kontakt</Link>
      {!signedIn && <Link to='/login'>Login</Link>}
    </nav>
  );
};

export default Navigation;
