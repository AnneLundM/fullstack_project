import { useState } from "react";
import styles from "./backoffice.module.css";
import { Link } from "react-router-dom";
import {
  BackofficeMessages,
  BackofficeProducts,
  BackofficeUsers,
} from "./BackofficeItems";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useFetchMessages } from "../../hooks/useFetchMessages";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import FadeWrapper from "../../styles/FadeWrapper";
import ProfileCard from "../../components/profile/ProfileCard";

const Backoffice = () => {
  const [view, setView] = useState("");
  const { products, refetchProducts } = useFetchProducts();
  const { messages, refetchMessages } = useFetchMessages();
  const { users, refetchUsers } = useFetchUsers();

  return (
    <FadeWrapper>
      <article className={styles.backoffice}>
        <header>
          <h1>Backoffice</h1>
          <ProfileCard />
        </header>
        <nav>
          <button onClick={() => setView("products")}>Vis Produktliste</button>
          <button onClick={() => setView("messages")}>Vis Beskeder</button>
          <button onClick={() => setView("users")}>Vis Brugere</button>
        </nav>
        {view === "products" && (
          <BackofficeProducts
            products={products}
            onProductCreated={refetchProducts}
          />
        )}
        {view === "messages" && (
          <BackofficeMessages
            messages={messages}
            onMessageCreated={refetchMessages}
          />
        )}
        {view === "users" && (
          <BackofficeUsers users={users} onUserCreated={refetchUsers} />
        )}
      </article>
    </FadeWrapper>
  );
};

export default Backoffice;
