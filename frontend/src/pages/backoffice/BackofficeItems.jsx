import { useState } from "react";
import ProductForm from "../../components/forms/ProductForm";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ProductCard from "../../components/productCard/ProductCard";
import MessageCard from "../../components/messageCard/MessageCard";
import styles from "./backoffice.module.css";

// Produkter
const BackofficeProducts = ({ products, onProductCreated }) => {
  const { deleteProduct } = useFetchProducts();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = () => {
    setShowEditForm(!showEditForm);
  };

  const handleAddProduct = () => {
    setShowForm(!showForm);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Er du sikker på, at du vil slette produktet?"
    );

    if (!confirmDelete) return; // Brugeren trykkede 'Annuller'

    try {
      await deleteProduct(productId);
      onProductCreated();
    } catch (error) {
      console.error("Fejl ved sletning:", error);
    }
  };

  return (
    <section className={styles.backofficeItems}>
      <h1>Produkter</h1>
      <button onClick={() => handleAddProduct()}>Tilføj produkt</button>
      {showForm && (
        <ProductForm
          onProductCreated={onProductCreated}
          showForm={handleAddProduct}
        />
      )}
      <div className='grid'>
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product._id}
            onDelete={handleDeleteProduct}
            onProductCreated={onProductCreated}
            toggleForm={handleEdit}
          />
        ))}
      </div>
    </section>
  );
};

// Beskeder
const BackofficeMessages = ({ messages, onMessageCreated }) => {
  return (
    <section className={styles.backofficeItems}>
      <h1>Beskeder</h1>
      <ul className='grid'>
        {messages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            onMessageCreated={onMessageCreated}
          />
        ))}
      </ul>
    </section>
  );
};

export { BackofficeProducts, BackofficeMessages };
