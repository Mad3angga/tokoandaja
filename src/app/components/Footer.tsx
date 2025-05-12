"use client";

import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">TokoAndaja</h3>
            <p className="text-gray-300 mb-4">
              Toko online terpercaya dengan berbagai produk berkualitas. Kami menyediakan layanan
              pembelian yang mudah melalui WhatsApp.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/6282135626476" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://instagram.com/tokoandaja" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com/tokoandaja" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-green-400" />
                <span className="text-gray-300">Jl. Bali No. 123, Bali, Indonesia</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-green-400" />
                <span className="text-gray-300">+62 821-3562-6476</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-green-400" />
                <span className="text-gray-300">andajagroup@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TokoAndaja. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
