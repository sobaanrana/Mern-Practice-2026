import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (!response.ok || json.success === false) {
        console.error("Error fetching products:", json.message);
      }

      setProducts(json.data || []);
      console.log("Fetched products:", json.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={styles.product_list_container}>
      {products?.map((product) => (
        <ProductCard key={product._id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;
