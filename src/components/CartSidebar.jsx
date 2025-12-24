import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const cartIds = userSnap.exists() ? userSnap.data().cart || [] : [];

      const productsSnap = await getDocs(collection(db, "products"));
      const products = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = products.filter((p) =>
        cartIds.includes(p.id)
      );

      setCartItems(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen]);

  const removeFromCart = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      cart: arrayRemove(id),
    });

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-neutral-900 z-51 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            <div className="flex-1 space-y-4 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-[#0f0f0f] p-3 rounded"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-white text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="text-green-400 text-sm">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer text-[.6rem] border border-[#ff0000]  py-1 px-1 font-thin text-[#ff0000] hover:text-red-500 hover:border-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-700 pt-4 mt-4">
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
