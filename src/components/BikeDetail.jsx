import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import Loader from "./Loader";


const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, [id]);

useEffect(() => {
  const fetchBike = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setBike(docSnap.data());
    setLoading(false);
  };
  fetchBike();
}, [id]);


  useEffect(() => {
    const fetchBike = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setBike(docSnap.data());
      setLoading(false);
    };
    fetchBike();
  }, [id]);

  useEffect(() => {
    const fetchCartCount = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setCartCount(userSnap.data().cart?.length || 0);
    };
    fetchCartCount();
  }, [cartOpen]);

  if (loading)
    return <div className="text-center mt-32 text-gray-400"><Loader /></div>;
  if (!bike)
    return <div className="text-center mt-32 text-gray-400">Bike not found</div>;

  return (
    <>
      <Navbar cartCount={cartCount} cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="bg-[#0b0b0b] text-white min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-sm text-gray-400 cursor-pointer hover:text-white transition"
          >
            ← Back to products
          </button>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Section */}
            <div className="bg-[#111] rounded-xl p-6 flex items-center justify-center">
              <img
                src={bike.imageUrl}
                alt={bike.name}
                className="w-full max-h-[520px] object-contain"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
                  {bike.name}
                </h1>
                <p className="text-gray-400 text-sm mb-4">
                  {bike.category} • {bike.year}
                </p>

                <p className="text-green-400 text-2xl font-bold mb-6">
                  ${bike.price.toLocaleString()}
                </p>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {bike.description}
                </p>
              </div>

              {/* Specs */}
              <div className="border-t border-gray-800 pt-6 space-y-3 text-sm">
                <p><span className="text-gray-400">Made In:</span> {bike.madein}</p>
                <p><span className="text-gray-400">Engine:</span> {bike.engine}</p>
                <p><span className="text-gray-400">Horsepower:</span> {bike.horsepower}</p>
                <p><span className="text-gray-400">Transmission:</span> {bike.transmission}</p>
                <p><span className="text-gray-400">Fuel Capacity:</span> {bike.fuelCapacity}</p>
                <p><span className="text-gray-400">Acceleration:</span> {bike.acceleration}</p>
              </div>

              {/* Buy Button */}
              <div className="pt-6">
                <button
                  onClick={() => alert("Buy now clicked!")}
                  className="cursor-pointer w-full py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default BikeDetail;
