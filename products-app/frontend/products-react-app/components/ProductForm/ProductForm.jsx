import React, { useEffect } from "react";

const ProductForm = ({ setProducts, formData, setFormData, editProduct }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json().catch(() => ({})); // prevent JSON parse crash

      if (!response.ok || json.success === false) {
        console.error("Error adding product:", json.message);
        alert("Error adding product: " + json.message);
        return;
      }
      //   alert("Product added successfully!");
      console.log("Product added successfully:", json);
      setProducts((prev) => [...prev, json.data]);
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Error adding product: " + error.message);
      return;
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/update/${formData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          image: formData.image,
        }),
      });

      const json = await response.json();

      if (!response.ok || response.success === false) {
        console.log("Error editing product:", json.message);
        return;
      }
      console.log("Product edited successfully:", json);
      setProducts((prev) => [
        ...prev.map((product) =>
          product._id === formData._id ? json.data : product
        ),
      ]);
    } catch (error) {
      console.error("Error editing product:", error.message);
    }
  };

  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  return (
    <div className="bg-white p-8">
      <h2 className="border-b border-gray-200 pb-2 font-semibold">
        Add a Product
      </h2>
      <form onSubmit={handleSubmit} className="py-2">
        <div className="py-2 flex flex-col gap-2 ">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="py-2 flex flex-col gap-2 ">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            required
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="py-2 flex flex-col gap-2 ">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            required
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex justify-between gap-2">
          {editProduct ? (
            <button
              type="button"
              onClick={handleEditProduct}
              className="w-[50%] bg-green-400 text-white rounded px-2 py-1 text-sm hover:bg-green-500 font-semibold text-center"
            >
              Edit Product
            </button>
          ) : (
            <button
              type="submit"
              className="w-[50%] bg-blue-400 text-white rounded px-2 py-1 text-sm hover:bg-blue-500 font-semibold text-center"
            >
              Add Product
            </button>
          )}

          <button
            type="reset"
            className="w-[50%] bg-gray-200 text-gray-700 rounded px-2 py-1 text-sm hover:bg-gray-300 font-semibold text-center"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
