import { useState } from "react";
import ProductForm from "../forms/ProductForm";
import styles from "./productCard.module.css";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const ProductCard = ({ product, onProductCreated }) => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const { deleteProduct, error, refetchProducts } = useFetchProducts();
  const { user } = useAuth();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Er du sikker?",
        text: "Du er ved at slette dette produkt.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ja, slet",
        cancelButtonText: "Annullér",
      });

      if (result.isConfirmed) {
        await deleteProduct(productId);

        await Swal.fire({
          title: "Slettet!",
          text: "Produktet er blevet slettet.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        refetchProducts();
      }
    } catch (error) {
      console.error("Der opstod en fejl ved sletning:", error);
      Swal.fire("Fejl!", "Noget gik galt under sletning.", "error");
    }
  };

  return (
    <>
      {isEditing ? (
        <ProductForm
          onProductCreated={onProductCreated}
          isEditMode={true}
          id={product._id}
          showForm={handleEditClick}
        />
      ) : (
        <li className={styles.card}>
          <h2>{product.title}</h2>
          <p>{product.price} kr.</p>
          {product.image && <img alt={product.title} src={product.image} />}

          {location.pathname !== "/products" && user.role === "admin" && (
            <>
              <div className={styles.buttons}>
                <button onClick={() => handleDelete(product._id)}>
                  Slet produkt
                </button>

                <button onClick={handleEditClick}>
                  {isEditing ? "Annuller redigering" : "Redigér produkt"}
                </button>
              </div>

              {error && <h5 className='error'>{error}</h5>}
            </>
          )}
        </li>
      )}
    </>
  );
};

export default ProductCard;
