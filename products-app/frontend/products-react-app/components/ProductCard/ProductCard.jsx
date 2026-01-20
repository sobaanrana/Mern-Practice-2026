import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ data, setProducts, setFormData, setEditProduct }) => {
  console.log("ProductCard data:", data);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (!response.ok || json.success === false) {
        console.log("Error deleting product:", json.message);
        return;
      }
      console.log("Product deleted successfully:", json);
      setProducts((prev) => [...prev.filter((product) => product._id !== id)]);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const onEdit = () => {
    setEditProduct((prev) => !prev);
    setFormData({
      name: data.name,
      price: data.price,
      image: data.image,
      _id: data._id,
    });
  };

  return (
    <div className={styles.product_card_main_container}>
      <div className={styles.product_card_inner_container}>
        <div className={styles.product_card_image_container}>
          <img
            className={styles.product_card_image}
            src={data?.image}
            alt={data?.name}
          />
        </div>
        <div className={styles.product_card_right_container}>
          <p>{data?.name}</p>
          <p>${data?.price}</p>
        </div>
      </div>
      <div className={styles.product_buttons_container}>
        <button
          className={styles.product__edit_button}
          onClick={() => onEdit(data?._id)}
        >
          Edit
        </button>
        <button
          className={styles.product__delete_button}
          onClick={() => onDelete(data?._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
