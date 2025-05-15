import { useState } from "react";
import ProductForm from "../../components/forms/ProductForm";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ProductCard from "../../components/productCard/ProductCard";
import MessageCard from "../../components/messageCard/MessageCard";

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
    <section>
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
    <>
      <h1>Beskeder</h1>
      <ul>
        {messages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            onMessageCreated={onMessageCreated}
          />
        ))}
      </ul>
    </>
  );
};

export { BackofficeProducts, BackofficeMessages };
