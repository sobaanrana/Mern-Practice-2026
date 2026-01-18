import React from "react";

const ProductForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  return (
    <div>
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" required />
        </div>
        <label>Image URL</label>
        <input type="text" name="imageUrl" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
