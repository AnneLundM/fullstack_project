import { useState } from "react";
import styles from "./backoffice.module.css";
import { Link } from "react-router-dom";
import { BackofficeMessages, BackofficeProducts } from "./BackofficeItems";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useFetchMessages } from "../../hooks/useFetchMessages";

const Backoffice = () => {
  const [view, setView] = useState("");
  const { products, refetchProducts } = useFetchProducts();
  const { messages, refetchMessages } = useFetchMessages();

  return (
    <article className={styles.backoffice}>
      <section>
        <header>
          <h1>Backoffice</h1>
          <Link to='/'>Tilbage til frontend</Link>
        </header>
        <nav>
          <button onClick={() => setView("products")}>Vis Produktliste</button>
          <button onClick={() => setView("messages")}>Vis Beskeder</button>
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
      </section>
    </article>
  );
};

export default Backoffice;
