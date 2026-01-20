import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

const ProductList = ({
  products,
  loading,
  error,
  setProducts,
  setFormData,
  setEditProduct,
}) => {
  return (
    <div className={styles.product_list_container}>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        products?.map((product, id) => (
          <ProductCard
            key={product?._id || id}
            data={product}
            setProducts={setProducts}
            setFormData={setFormData}
            setEditProduct={setEditProduct}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
