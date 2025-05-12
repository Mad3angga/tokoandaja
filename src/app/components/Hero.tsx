"use client";

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Belanja Mudah di TokoAndaja
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-white font-medium">
            Temukan berbagai produk berkualitas dengan harga terjangkau. 
            Pembelian mudah langsung melalui WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products" 
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition duration-300"
            >
              Lihat Produk
            </Link>
            <a 
              href="https://wa.me/6282135626476" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center transition duration-300"
            >
              <FaWhatsapp className="mr-2" size={20} />
              Chat Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
