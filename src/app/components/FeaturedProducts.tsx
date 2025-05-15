"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { FaWhatsapp, FaTimes, FaCheckCircle, FaQrcode } from 'react-icons/fa';
import { getFeaturedProducts, Product } from '@/lib/products';
import ProductOptions from './ProductOptions';

// Import CSS untuk slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom styles for animations
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  // State untuk produk unggulan
  const [, setCurrentSlide] = useState(0);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewerCount, setViewerCount] = useState<number | null>(null);
  const [showViewerPopup, setShowViewerPopup] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
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
          setFinalPrice(featuredProducts[0].price);
        }
      } catch (error) {
        console.error('Error loading featured product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadFeaturedProduct();
    
    // Simulasi jumlah orang yang melihat produk
    const randomViewers = Math.floor(Math.random() * 5) + 1; // Random antara 1-5 orang
    setViewerCount(randomViewers);
    
    // Tampilkan popup setelah beberapa detik
    const popupTimer = setTimeout(() => {
      setShowViewerPopup(true);
      
      // Sembunyikan popup setelah beberapa detik
      const hideTimer = setTimeout(() => {
        setShowViewerPopup(false);
      }, 8000); // Popup akan hilang setelah 8 detik
      
      return () => clearTimeout(hideTimer);
    }, 2000); // Popup akan muncul setelah 2 detik
    
    return () => clearTimeout(popupTimer);
  }, []);
  
  // Listen for price updates from ProductOptions component
  useEffect(() => {
    const handlePriceUpdate = (e: CustomEvent) => {
      setFinalPrice(e.detail.price);
    };
    
    const handleOptionUpdate = (e: CustomEvent) => {
      setSelectedOption(e.detail.selectedOption);
    };
    
    // Add event listeners
    window.addEventListener('priceUpdate', handlePriceUpdate as EventListener);
    window.addEventListener('optionUpdate', handleOptionUpdate as EventListener);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('priceUpdate', handlePriceUpdate as EventListener);
      window.removeEventListener('optionUpdate', handleOptionUpdate as EventListener);
    };
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
  const formattedPrice = formatPrice(finalPrice || featuredProduct.price);
  
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
            
            <div className="p-4 relative">
              {/* Popup Viewer */}
              {showViewerPopup && viewerCount && (
                <div className="absolute -top-3 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-md animate-pulse transition-opacity">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {viewerCount} orang sedang melihat produk ini
                  </div>
                </div>
              )}
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
              
              <p className="text-gray-800 text-sm mb-4 whitespace-pre-line">{featuredProduct.description}</p>
              
              <div className="flex space-x-2">
                <a 
                  href={`/products/${featuredProduct.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-center text-sm transition"
                >
                  Detail produk
                </a>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-center text-sm flex items-center justify-center transition"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-500/20 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-[2px]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Pembayaran</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              
              <div>
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Produk: <span className="font-semibold">{featuredProduct.name}</span></p>
                  
                  {/* Menambahkan opsi produk */}
                  {featuredProduct.options && featuredProduct.options.length > 0 && (
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">Pilihan Produk:</p>
                      <ProductOptions 
                        productId={featuredProduct.id} 
                        basePrice={featuredProduct.price} 
                        options={featuredProduct.options}
                      />
                    </div>
                  )}
                  
                  <p className="text-gray-700 mb-4">Total: <span className="font-semibold text-green-600">{formattedPrice}</span></p>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center justify-center mb-2">
                      <FaQrcode className="text-blue-500 mr-2" />
                      <h4 className="text-center font-semibold text-black">Pembayaran QRIS</h4>
                    </div>
                    <div className="flex justify-center mb-3">
                      <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 shadow-inner">
                        <div className="relative">
                          <Image 
                            src="/qris-sample.png" 
                            alt="QRIS Code" 
                            width={200} 
                            height={200} 
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-2">Scan kode QR di atas menggunakan aplikasi e-wallet atau mobile banking Anda</p>
                    <p className="text-xs text-gray-500 text-center mb-4">Pembayaran akan diverifikasi secara otomatis</p>
                    
                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <p className="text-sm text-gray-700 text-center mb-3">Setelah melakukan pembayaran, silakan hubungi kami:</p>
                      
                      <a 
                        href={`https://wa.me/6282135626476?text=Halo%2C%20saya%20baru%20saja%20membeli%20produk%20*${encodeURIComponent(featuredProduct.name)}*%20dengan%20harga%20${encodeURIComponent(formattedPrice)}${selectedOption ? `%20dengan%20pilihan%20*${encodeURIComponent(selectedOption)}*` : ''}.%20Mohon%20informasi%20selanjutnya%20untuk%20pengiriman.%20Terima%20kasih.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                      >
                        <FaWhatsapp className="mr-2 text-xl" />
                        Hubungi via WhatsApp
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800 text-center">Harap segera hubungi kami setelah melakukan pembayaran untuk konfirmasi dan proses pengiriman</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <FaTimes className="mr-2" />
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
