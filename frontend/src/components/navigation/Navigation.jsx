/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./navigation.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [open, setOpen] = useState(false);
  const { signedIn, signOut } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_logo}>Logo</div>

        {open ? (
          <MdClose
            className={styles.navbar_toggle}
            size={25}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <GiHamburgerMenu
            className={styles.navbar_toggle}
            onClick={() => setOpen(!open)}
            size={25}
          />
        )}

        <ul className={styles.navbar_links_desktop}>
          <li>
            <Link to='/'>Forside</Link>
          </li>
          <li>
            <Link to='/products'>Produkter</Link>
          </li>
          <li>
            <Link to='/contact'>Kontakt</Link>
          </li>
          {signedIn ? (
            <>
              <li>
                <Link to='/backoffice'>Backoffice</Link>
              </li>
              <li>
                <Link onClick={signOut}>Log ud</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to='/login'>Log ind</Link>
            </li>
          )}
          {/* <li>
            <Link to='/backoffice'>Backoffice</Link>
         
          </li> */}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.navbar_links_mobile}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}>
            <li>
              <Link to='/' onClick={() => setOpen(false)}>
                Forside
              </Link>
            </li>
            <li>
              <Link to='/products' onClick={() => setOpen(false)}>
                Produkter
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={() => setOpen(false)}>
                Kontakt
              </Link>
            </li>

            <li>
              <Link to='/backoffice' onClick={() => setOpen(false)}>
                Backoffice
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ResponsiveNavbar;
