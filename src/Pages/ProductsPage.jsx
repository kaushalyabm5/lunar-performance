import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const fetchCartCount = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) setCartCount(userSnap.data().cart?.length || 0);
  };
  useEffect(() => { fetchCartCount(); }, [cartOpen]);

  const addToCart = async (productId) => {
    const user = auth.currentUser;
    if (!user) { showModalMessage("Please login first"); return; }
    const userRef = doc(db, "users", user.uid);
    try {
      await setDoc(userRef, { cart: arrayUnion(productId) }, { merge: true });
      showModalMessage("Added to cart successfully!");
      fetchCartCount();
    } catch (error) { console.error(error); showModalMessage("Error adding to cart"); }
  };

  const showModalMessage = (message) => { setModalMessage(message); setShowModal(true); };

  if (loading) return <div className="text-white text-center mt-20 text-lg"><Loader/></div>;

  return (
    <>
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} cartCount={cartCount} />
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-[2rem] font-extrabold text-white text-center mb-12 tracking-tight">Superbike Collection</h1>
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-neutral-950 rounded-sm border border-neutral-600 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl"
              onClick={() => navigate(`/bike/${p.id}`)}
            >
              <img src={p.imageUrl} alt={p.name} className="h-56 w-full object-cover"/>
              <div className="p-5">
                <h2 className="text-[1rem] font-semibold text-white mb-1"><span></span>{p.name}<span className="font-thin text-neutral-500 ml-5">{p.year}</span></h2>
                <p className="text-gray-400 mb-1">{p.category}</p>
                <p className="text-green-400 font-bold text-lg mb-4">${p.price.toLocaleString()}</p>
                <button onClick={(e)=>{e.stopPropagation(); addToCart(p.id)}} className="w-full text-white py-2 border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-800 cursor-pointer transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/80" />
          <div className="bg-neutral-800 text-green-400 px-6 py-4 rounded-lg shadow-lg z-10 text-center max-w-xs mx-4">
            <p className="mb-4">{modalMessage}</p>
            <button onClick={()=>setShowModal(false)} className="cursor-pointer text-[.8rem] px-4 py-1 bg-green-400 text-white font-bold rounded-[5px] hover:bg-green-500 transition">OK</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductsPage;
