// src/pages/AddItem.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { CATEGORIES } from "../constants/categories";
import { useAuth } from "../context/AuthContext";

const AddItem = () => {
  const { currentUser } = useAuth();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!inputs.title) tempErrors.title = "Title is required";
    if (!inputs.category) tempErrors.category = "Category is required";
    if (!image) tempErrors.image = "Image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // ✅ 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudRes.data.secure_url;

      // ✅ 2. Send item data to your Express backend (which will save in MongoDB)
      await axios.post(`${import.meta.env.BASE_URL}/api/items`, {
        ...inputs,
        imageUrl,
        ownerId: currentUser.uid,
        status: "Available",
      });

      toast.success("Item added successfully!");
      setInputs({ title: "", description: "", category: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">List a New Item</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          type="text"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          placeholder="e.g., Blue Jacket"
          error={errors.title}
        />

        <FormInput
          label="Description"
          type="text"
          value={inputs.description}
          onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
          placeholder="Add a short description"
        />

        <label className="block mb-1 font-medium">Category</label>
        <select
          value={inputs.category}
          onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
          className={`w-full p-2 border rounded mb-4 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p className="text-red-500 text-sm mb-4">{errors.category}</p>}

        <label className="block mb-1 font-medium">Image</label>
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className={`w-full p-2 border rounded mb-4 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.image && <p className="text-red-500 text-sm mb-4">{errors.image}</p>}

        <button 
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Adding..." : "Submit Item"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
