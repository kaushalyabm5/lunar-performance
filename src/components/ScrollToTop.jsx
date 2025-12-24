import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="cursor-pointer fixed bottom-6 right-6 w-12 h-12 bg-neutral-600 hover:bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg transition z-50"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;
