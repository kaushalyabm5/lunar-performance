import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user's cart count
  const fetchCartCount = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const cart = userSnap.data().cart || [];
      setCartCount(cart.length);
    }
  };

  // Fetch cart count on load and whenever cart sidebar opens/closes
  useEffect(() => {
    fetchCartCount();
  }, [cartOpen]);

  const addToCart = async (productId) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }
    const userRef = doc(db, "users", user.uid);
    try {
      await setDoc(userRef, { cart: arrayUnion(productId) }, { merge: true });
      alert("Added to cart");
      fetchCartCount(); // Update count after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20 text-lg">Loading Bikes...</div>;
  }

  return (
    <>
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} cartCount={cartCount} />

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
          Lunar Performance – Superbikes
        </h1>

        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-950 rounded-sm border border-neutral-600 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white mb-1">{product.name}</h2>
                <p className="text-gray-400 mb-2">{product.category}</p>
                <p className="text-green-400 font-bold text-lg mb-4">
                  ${product.price.toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full text-white py-2 border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-800 cursor-pointer transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
