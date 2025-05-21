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

const Products = () => {
  const { products, refetch, error, isLoading } = useFetchProducts();

  if (isLoading) return <ReactClipLoader />;

  return (
    <article>
      <h1>Produkter</h1>
      <div className='grid'>
        {error && <h5>{error}</h5>}
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
