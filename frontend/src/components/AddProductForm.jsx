import { useState } from "react";

import api from "../api/axios";



const AddProductForm = ({
  fetchProducts,
}) => {

  const [url, setUrl] = useState("");




  // =========================
  // ADD PRODUCT
  // =========================

  const addProduct = async () => {

    try {

      await api.post(
        "/products/add",
        { url }
      );

      alert("Product added!");

      setUrl("");

      await fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Failed to add product");
    }
  };




  return (

    <div className="mb-10 flex gap-4">

      <input
        type="text"
        placeholder="Paste product URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        className="border p-3 rounded w-full"
      />

      <button
        onClick={addProduct}
        className="bg-black text-white px-6 rounded"
      >
        Add Product
      </button>

    </div>
  );
};

export default AddProductForm;