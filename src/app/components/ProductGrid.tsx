"use client";

import ProductCard from './ProductCard';
import { Product } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
  category?: string;
}

export default function ProductGrid({ products, category }: ProductGridProps) {
  // Filter produk berdasarkan kategori jika ada
  const filteredProducts = category 
    ? products.filter(product => product.category === category) 
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
        />
      ))}
    </div>
  );
}
