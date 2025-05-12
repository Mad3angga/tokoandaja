import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Maaf, produk yang Anda cari tidak ditemukan atau mungkin telah dihapus.
        </p>
        <Link 
          href="/products" 
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Kembali ke Halaman Produk
        </Link>
      </div>
    </div>
  );
}
