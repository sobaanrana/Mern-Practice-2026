import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ data }) => {
  console.log("ProductCard data:", data);
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
        <button className={styles.product__edit_button}>Edit</button>
        <button className={styles.product__delete_button}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
