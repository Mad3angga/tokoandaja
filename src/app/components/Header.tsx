"use client";

import Link from 'next/link';
import { FaShoppingBag, FaWhatsapp, FaBars } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600 flex items-center">
            <FaShoppingBag className="mr-2" />
            <span>TokoAndaja</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars size={24} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">
              Beranda
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition">
              Produk
            </Link>
            <Link 
              href="https://wa.me/6282135626476" 
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center transition"
            >
              <FaWhatsapp className="mr-2" />
              <span>Chat Kami</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-green-600 transition py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-green-600 transition py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="https://wa.me/6282135626476" 
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaWhatsapp className="mr-2" />
                <span>Chat Kami</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
