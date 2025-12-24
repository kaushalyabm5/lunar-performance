import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-400 py-12 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white">
          LUNAR
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/products" className="hover:text-white transition">
            Products
          </Link>
          <a href="#about" className="hover:text-white transition">
            About Us
          </a>
          <a href="#reviews" className="hover:text-white transition">
            Reviews
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-white" />
            <span>info@lunarperformance.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-white" />
            <span>+1 (555) 019‑7842
</span>
          </div>
          <div>
            <span>Silverstone Avenue, Los Angeles, United States</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800 mt-8" />

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Lunar Performance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
