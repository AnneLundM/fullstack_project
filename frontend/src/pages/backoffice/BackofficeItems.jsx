import { useState } from "react";
import ProductForm from "../../components/forms/ProductForm";
import ProductCard from "../../components/productCard/ProductCard";
import MessageCard from "../../components/messageCard/MessageCard";
import UserCard from "../../components/userCard/UserCard";
import FadeWrapper from "../../styles/FadeWrapper";

// Produkter
const BackofficeProducts = ({ products, onProductCreated }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    setShowForm(!showForm);
  };

  return (
    <FadeWrapper>
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
            onProductCreated={onProductCreated}
          />
        ))}
      </div>
    </FadeWrapper>
  );
};

// Beskeder
const BackofficeMessages = ({ messages, onMessageCreated }) => {
  return (
    <FadeWrapper>
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
    </FadeWrapper>
  );
};

// Brugere
const BackofficeUsers = ({ users, onUserCreated }) => {
  return (
    <FadeWrapper>
      <h1>Brugere</h1>
      <ul className='grid'>
        {users?.map((user) => (
          <UserCard key={user._id} user={user} onUserCreated={onUserCreated} />
        ))}
      </ul>
    </FadeWrapper>
  );
};

export { BackofficeProducts, BackofficeMessages, BackofficeUsers };
