"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { getFeaturedProducts, Product } from '@/lib/products';

// Import CSS untuk slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Fungsi untuk menghitung sisa hari diskon
function getRemainingDays(endDateStr: string): number {
  if (!endDateStr) return 0;
  
  const endDate = new Date(endDateStr);
  const today = new Date();
  
  // Reset jam, menit, detik, dan milidetik untuk perbandingan yang akurat
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Hitung selisih dalam milidetik dan konversi ke hari
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

// Komponen tombol next/prev kustom untuk slider
const NextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10 bg-white shadow-md rounded-full p-2 absolute right-2 top-1/2 transform -translate-y-1/2`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaArrowRight className="text-gray-800" />
    </div>
  );
};

const PrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10 bg-white shadow-md rounded-full p-2 absolute left-2 top-1/2 transform -translate-y-1/2`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <FaArrowLeft className="text-gray-800" />
    </div>
  );
};

export default function FeaturedProducts() {
  // State untuk produk unggulan
  const [, setCurrentSlide] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Format harga dalam Rupiah - using a more consistent approach to avoid hydration errors
  const formatPrice = (price: number) => {
    // Simple formatting to avoid locale-specific issues that can cause hydration errors
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;  
  };
  
  // Mengambil data produk unggulan dari Supabase
  useEffect(() => {
    async function loadFeaturedProduct() {
      try {
        const featuredProducts = await getFeaturedProducts(1);
        if (featuredProducts && featuredProducts.length > 0) {
          setFeaturedProduct(featuredProducts[0]);
        }
      } catch (error) {
        console.error('Error loading featured product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadFeaturedProduct();
  }, []);
  
  // Konfigurasi slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: unknown, next: number) => setCurrentSlide(next),
  };
  
  // Jika masih loading atau tidak ada produk unggulan
  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Memuat produk unggulan...</p>
        </div>
      </section>
    );
  }
  
  if (!featuredProduct) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Tidak ada produk unggulan saat ini.</p>
        </div>
      </section>
    );
  }
  
  // Format harga asli dan harga diskon
  const formattedOriginalPrice = formatPrice(featuredProduct.originalPrice || 0);
  const formattedPrice = formatPrice(featuredProduct.price);
  
  // Hitung sisa hari diskon
  const remainingDays = getRemainingDays(featuredProduct.discountEndDate || '');
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Produk Unggulan</h2>
          <p className="text-gray-800 max-w-2xl mx-auto font-medium">
            Produk terbaik dan paling diminati oleh pelanggan kami
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative">
              {/* Slider Gambar */}
              <div className="relative h-64 w-full">
                <Slider {...sliderSettings}>
                  {featuredProduct.images?.map((image: string, index: number) => (
                    <div key={index} className="h-64 w-full relative">
                      <Image
                        src={image}
                        alt={`${featuredProduct.name} - Gambar ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              
              {/* Badge Diskon */}
              {featuredProduct.discount && (
                <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
                  DISKON {featuredProduct.discount}%
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{featuredProduct.name}</h3>
              
              {/* Harga dengan Diskon */}
              <div className="mb-2">
                {featuredProduct.originalPrice && (
                  <span className="text-gray-500 line-through mr-2">{formattedOriginalPrice}</span>
                )}
                <span className="text-green-600 font-bold">{formattedPrice}</span>
              </div>
              
              {/* Durasi Diskon */}
              {featuredProduct.discountEndDate && remainingDays > 0 && (
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium mb-3 inline-block">
                  Diskon berakhir dalam {remainingDays} hari
                </div>
              )}
              
              <p className="text-gray-800 text-sm mb-4">{featuredProduct.description}</p>
              
              <div className="flex space-x-2">
                <a 
                  href={`/products/${featuredProduct.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-center text-sm transition"
                >
                  Detail
                </a>
                <a 
                  href={`https://wa.me/6282135626476?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(featuredProduct.name)}*%20dengan%20harga%20${encodeURIComponent(formattedPrice)}%20yang%20sedang%20diskon.%20Apakah%20masih%20tersedia%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-center text-sm flex items-center justify-center transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Beli
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
