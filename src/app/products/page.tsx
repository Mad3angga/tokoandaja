import ProductGrid from '../components/ProductGrid';
import { getAllProducts } from '@/lib/products';

export const metadata = {
  title: 'Produk - TokoAndaja',
  description: 'Jelajahi berbagai produk berkualitas dari TokoAndaja. Pembelian mudah melalui WhatsApp.'
};

export default async function ProductsPage() {
  // Mengambil data produk dari Supabase
  const products = await getAllProducts();
  return (
    <main className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Produk Kami</h1>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Temukan berbagai produk berkualitas dengan harga terjangkau. Semua pembelian dapat dilakukan langsung melalui WhatsApp.
          </p>
        </div>
        
        {/* Filter dan Pencarian bisa ditambahkan di sini */}
        
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
