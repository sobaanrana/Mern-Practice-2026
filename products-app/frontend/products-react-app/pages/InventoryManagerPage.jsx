import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductList from "../components/ProductList/ProductList";
import styles from "./InventoryManagerPage.module.css";

const InventoryManagerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editProduct, setEditProduct] = useState(false);

  const [formData, setFormData] = React.useState({
    _id: "",
    name: "",
    price: "",
    image: "",
  });

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
    <div className={styles.imp_main_container}>
      <ProductForm
        className={styles.imp_main_container}
        setProducts={setProducts}
        formData={formData}
        setFormData={setFormData}
        editProduct={editProduct}
      />
      <ProductList
        products={products}
        loading={loading}
        error={error}
        setProducts={setProducts}
        setFormData={setFormData}
        setEditProduct={setEditProduct}
      />
    </div>
  );
};

export default InventoryManagerPage;
