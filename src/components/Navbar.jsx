import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartOpen, setCartOpen, cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Scroll or navigate
 const handleScrollLink = (path) => {
  if (path === "/") {
    // Scroll to top if Home
    navigate(path); // optional, keeps URL correct
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (path.startsWith("#")) {
    const sectionId = path.slice(1);

    if (location.pathname !== "/") {
      // Navigate to homepage and pass scroll target
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const yOffset = -100; // adjust for fixed navbar
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  } else {
    navigate(path);
  }
};


  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "#about" },
    { name: "Bikes", path: "/products" },
    
    
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-white cursor-pointer transition-colors"
          onClick={() => navigate("/")}
        >
          LUNAR
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <span
              key={link.name}
              onClick={() => {
                handleScrollLink(link.path);
                setMenuOpen(false);
              }}
              className="cursor-pointer text-neutral-200 hover:text-white transition-colors"
            >
              {link.name}
            </span>
          ))}
        </div>

        {/* Right side: Cart / User */}
        <div className="flex items-center gap-4 md:gap-8">
          {user && (
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative cursor-pointer hover:text-neutral-400 transition flex items-center"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-neutral-200 font-thin">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-neutral-600 hover:bg-neutral-500 px-4 py-2 transition text-white font-thin cursor-pointer rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hidden md:block bg-neutral-100 hover:bg-neutral-200 px-4 py-2 transition text-neutral-800 font-semibold cursor-pointer rounded"
            >
              Login / Signup
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-neutral-900 px-6 py-6 flex flex-col gap-4 shadow-lg animate-slideDown">
          {links.map((link) => (
            <span
              key={link.name}
              onClick={() => {
                handleScrollLink(link.path);
                setMenuOpen(false);
              }}
              className="cursor-pointer text-gray-300 hover:text-white font-medium transition-colors"
            >
              {link.name}
            </span>
          ))}

          {!user ? (
            <button
              onClick={() => {
                navigate("/auth");
                setMenuOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
            >
              Login / Signup
            </button>
          ) : (
            <>
              <span className="text-gray-200 font-medium px-2 py-1 bg-gray-700 rounded">
                {user.email}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
