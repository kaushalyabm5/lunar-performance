import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    madein: "",
    year: "",
    engine: "",
    horsepower: "",
    transmission: "",
    fuelCapacity: "",
    acceleration: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Predefined categories
  const categories = [
    "Superbike",
    "Naked Bike",
    "Sports Bike",
    "Hyperbike",
    "top-end Superbike",
    "Premium sportbike/superbike",
    "Naked Sport",
  ];

  // Fetch products
  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input validation
  const validateForm = () => {
    if (!form.name.trim() || !form.price || !form.category.trim()) {
      alert("Please fill all required fields (Name, Price, Category)");
      return false;
    }
    if (isNaN(form.price) || Number(form.price) <= 0) {
      alert("Price must be a positive number");
      return false;
    }
    if (
      form.year &&
      (isNaN(form.year) || Number(form.year) < 1900 || Number(form.year) > 2100)
    ) {
      alert("Year must be a valid number");
      return false;
    }
    if (!categories.includes(form.category)) {
      alert(`Category must be one of: ${categories.join(", ")}`);
      return false;
    }
    if (imageFile) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(imageFile.type)) {
        alert("Only JPEG or PNG images are allowed");
        return false;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxSize) {
        alert("Image size must be under 5MB");
        return false;
      }
    }
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    let finalImageUrl = "";

    try {
      // 1. Use URL if provided
      if (imageUrl) finalImageUrl = imageUrl;

      // 2. Upload file if selected
      if (imageFile) {
        const uniqueName = `${Date.now()}_${imageFile.name}`;
        const imageRef = ref(storage, `products/${uniqueName}`);
        await uploadBytes(imageRef, imageFile);
        const uploadedUrl = await getDownloadURL(imageRef);

        // Use uploaded image if URL is empty
        if (!finalImageUrl) finalImageUrl = uploadedUrl;
      }

      if (!finalImageUrl) {
        alert("Please provide an image via URL or upload a file");
        return;
      }

      const productData = {
        ...form,
        name: form.name.trim(),
        category: form.category.trim(),
        price: parseFloat(form.price),
        year: form.year ? parseInt(form.year) : null,
        imageUrl: finalImageUrl,
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      // Reset form and file input
      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        madein: "",
        year: "",
        engine: "",
        horsepower: "",
        transmission: "",
        fuelCapacity: "",
        acceleration: "",
      });
      setImageFile(null);
      setImageUrl("");
      document.querySelector('input[type="file"]').value = "";
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product. Try again.");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      price: p.price || "",
      category: p.category || "",
      description: p.description || "",
      madein: p.madein || "",
      year: p.year || "",
      engine: p.engine || "",
      horsepower: p.horsepower || "",
      transmission: p.transmission || "",
      fuelCapacity: p.fuelCapacity || "",
      acceleration: p.acceleration || "",
    });
    setImageUrl(p.imageUrl || "");
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-gray-200">
      <div className="flex min-h-screen">
        <Navbar />
        <main className="flex-1 flex justify-center overflow-y-auto">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <span className="text-sm text-gray-400">Product Management</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <Stat title="Total Products" value={products.length} />
              <Stat
                title="Categories"
                value={[...new Set(products.map((p) => p.category))].length}
              />
              <Stat
                title="Editing Mode"
                value={editingId ? "Active" : "Inactive"}
                highlight
              />
            </div>

            <section className="bg-neutral-900 border border-neutral-600 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg font-semibold mb-6">
                {editingId ? "Update Product" : "Add New Product"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  ["Name", "name"],
                  ["Price", "price"],
                  ["Category", "category"],
                  ["Made In", "madein"],
                  ["Year", "year"],
                  ["Engine", "engine"],
                  ["Horsepower", "horsepower"],
                  ["Transmission", "transmission"],
                  ["Fuel Capacity", "fuelCapacity"],
                  ["Acceleration", "acceleration"],
                ].map(([label, key]) => (
                  <input
                    key={key}
                    placeholder={label}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm"
                  />
                ))}

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 sm:col-span-2 xl:col-span-3 text-sm resize-none"
                  rows={3}
                />

                <input
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 sm:col-span-2 xl:col-span-3"
                />

                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="text-sm text-gray-400 xl:col-span-3"
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSaveProduct}
                  className={`px-6 cursor-pointer py-2 rounded-lg text-sm font-medium ${
                    editingId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {editingId ? "Update" : "Add Product"}
                </button>
              </div>
            </section>

            <section className="bg-neutral-900 border border-neutral-500 rounded-xl overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-neutral-800 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">Category</th>
                    <th className="p-4 text-center">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-neutral-800 hover:bg-[#0b0f1a]"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-8 rounded object-cover"
                        />
                        {p.name}
                      </td>
                      <td className="p-4 text-center">{p.category}</td>
                      <td className="p-4 text-center text-green-400">
                        $. {p.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="px-3 py-1 bg-yellow-600 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 bg-red-600 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

const Stat = ({ title, value, highlight }) => (
  <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2
      className={`text-3xl font-bold mt-2 ${
        highlight ? (value === "Active" ? "text-yellow-400" : "text-green-400") : ""
      }`}
    >
      {value}
    </h2>
  </div>
);

export default AdminPage;
