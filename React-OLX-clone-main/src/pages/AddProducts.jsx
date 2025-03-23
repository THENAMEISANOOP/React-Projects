import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxbn6tmy7/image/upload";
const UPLOAD_PRESET = "olx-clone";

const AddProducts = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const product = productSnap.data();
        setTitle(product.title);
        setCategory(product.category);
        setPrice(product.price);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
      } else {
        toast.error("Product not found!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details.");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);  
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return imageUrl; 

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", "dxbn6tmy7");

    try {
      console.log("Uploading to Cloudinary...");
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.secure_url) {
        toast.error("Image upload failed. Please try again.");
        return null;
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      toast.error("You must be logged in to add a product.");
      setLoading(false);
      return;
    }

    try {
      const finalImageUrl = await uploadImageToCloudinary();

      if (!finalImageUrl) throw new Error("Image upload failed!");

      const productData = {
        title,
        category,
        price: parseFloat(price),
        description,
        imageUrl: finalImageUrl,
        createdAt: new Date(),
        user: {
          name: currentUser.displayName || "Anonymous",
          email: currentUser.email || "N/A",
        },
      };

      if (isEditing) {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, productData);
        toast.success("Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), productData);
        toast.success("Product added successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {isEditing ? "Edit Product" : "Add Product"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />

            <textarea
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 resize-none"
              required
            ></textarea>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-md px-4 py-2 cursor-pointer file:bg-blue-500 file:text-white file:px-3 file:py-2 file:rounded-md file:border-none hover:file:bg-blue-600"
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProducts;
