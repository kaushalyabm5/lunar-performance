import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import WhyBuyFromUs from "../components/WhyBuyFromUs";
import PerformanceHighlights from "../components/PerformanceHighlights";
import CustomerReviews from "../components/CustomerReviews";
import AboutUs from "../components/AboutUs";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { motion } from "framer-motion";


const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Track user login state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user's cart from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const cart = userSnap.data().cart || [];
          setCartCount(cart.length);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0); // Not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  // Scroll on state passed from Navbar
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        const yOffset = -100;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen text-white w-full overflow-x-hidden">
      <Navbar
        cartOpen={cartOpen}
        setCartOpen={() => {
          if (!user) navigate("/auth");
          else setCartOpen(!cartOpen);
        }}
        cartCount={cartCount}
      />

      {cartOpen && user && (
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          setCartCount={setCartCount} // Optional: to update cart after changes
        />
      )}

      {/* HERO */}
      <motion.section 

      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      
      
      className="w-full py-44 relative text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-1">LUNAR</h1>
          <h3 className="text-sm sm:text-base md:text-[1.3rem] tracking-[1rem] font-bold ml-4 mb-10">
            PERFORMANCE
          </h3>

          <button
            onClick={() => {
              if (!user) navigate("/auth");
              else navigate("/products");
            }}
            className="cursor-pointer border border-neutral-800 px-6 py-3 hover:bg-neutral-900 transition mb-6"
          >
            Go to Bikes Store
          </button>

          <button
            onClick={() => {
              const featured = document.getElementById("featured-section");
              if (featured) {
                const yOffset = -100;
                const y = featured.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="mx-auto mt-4 flex items-center justify-center bg-neutral-600 w-12 h-12 rounded-full border border-neutral-600 hover:bg-neutral-900 transition cursor-pointer"
          >
            <ChevronDown size={24} className="text-white animate-bounce" />
          </button>
        </div>
      </motion.section>

      {/* FEATURED */}
      <section id="featured-section" className="w-full mt-20 px-10">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-6 text-center">
      Featured Superbikes
    </h2>

    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.slice(0, 4).map((p) => (
        <div
          key={p.id}
          onClick={() => navigate(`/bike/${p.id}`)}
          className="cursor-pointer bg-neutral-900 rounded-lg overflow-hidden hover:scale-[1.03] transition"
        >
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-green-400 font-bold">
              ${p.price.toLocaleString()}
            </p>
            <p className="text-neutral-400 text-sm">{p.category}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <section id="about"><AboutUs /></section>
      <WhyBuyFromUs />
      <PerformanceHighlights />
      <section id="reviews"><CustomerReviews /></section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
