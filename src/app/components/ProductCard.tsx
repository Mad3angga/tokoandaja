"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  // Format harga dalam Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

  // Fungsi untuk membuat pesan WhatsApp
  const createWhatsAppMessage = () => {
    const message = `Halo, saya tertarik dengan produk *${name}* dengan harga ${formattedPrice}. Apakah masih tersedia?`;
    return encodeURIComponent(message);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-green-600 font-bold mb-2">{formattedPrice}</p>
        <p className="text-gray-800 text-sm mb-4 line-clamp-2 whitespace-pre-line">{description}</p>
        
        <div className="flex space-x-2">
          <Link 
            href={`/products/${id}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-center text-sm transition"
          >
            Detail
          </Link>
          <a 
            href={`https://wa.me/6282135626476?text=${createWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-center text-sm flex items-center justify-center transition"
          >
            <FaWhatsapp className="mr-1" />
            Beli
          </a>
        </div>
      </div>
    </div>
  );
}
