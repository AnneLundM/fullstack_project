import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductForm from "../components/forms/ProductForm";
import ProductCard from "../components/productCard/ProductCard";
import {
  ReactClipLoader,
  ReactDotLoader,
  ReactPacManLoader,
  ReactPuffLoader,
} from "../components/loading/ReactLoader";
import { PacmanLoader } from "react-spinners";
import FadeWrapper from "../styles/FadeWrapper";
import Error from "../components/error/Error";

const Products = () => {
  const { products, refetch, error, isLoading } = useFetchProducts();

  if (isLoading) return <ReactClipLoader />;
  if (error) return <Error error={error} />;

  return (
    <article>
      <h1>Produkter</h1>
      <div className='grid'>
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product._id}
            onProductCreated={refetch}
          />
        ))}
      </div>
    </article>
  );
};

export default Products;
