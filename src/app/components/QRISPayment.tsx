'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQrcode, FaWhatsapp } from 'react-icons/fa';

interface QRISPaymentProps {
  productName: string;
  price: number;
  selectedOption: string | null;
}

const QRISPayment = ({ productName, price, selectedOption }: QRISPaymentProps) => {
  const [showQRIS, setShowQRIS] = useState(false);
  const [currentOption, setCurrentOption] = useState<string | null>(selectedOption);
  const [currentPrice, setCurrentPrice] = useState<number>(price);
  
  // Listen for option updates from ProductOptions component
  useEffect(() => {
    const handleOptionUpdate = (e: CustomEvent) => {
      setCurrentOption(e.detail.selectedOption);
    };
    
    const handlePriceUpdate = (e: CustomEvent) => {
      setCurrentPrice(e.detail.price);
    };
    
    // Add event listeners
    window.addEventListener('optionUpdate', handleOptionUpdate as EventListener);
    window.addEventListener('priceUpdate', handlePriceUpdate as EventListener);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('optionUpdate', handleOptionUpdate as EventListener);
      window.removeEventListener('priceUpdate', handlePriceUpdate as EventListener);
    };
  }, []);
  
  // Format price in Rupiah
  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };
  
  const formattedPrice = formatPrice(currentPrice || price);

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowQRIS(!showQRIS)}
        className={`flex items-center justify-center w-full py-3 px-4 rounded-lg mb-4 transition-all duration-200 ${
          showQRIS 
            ? 'bg-blue-100 text-blue-700 border border-blue-300' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <FaQrcode className="mr-2" size={20} />
        {showQRIS ? 'Sembunyikan QRIS' : 'Bayar dengan QRIS'}
      </button>
      
      {showQRIS && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <FaQrcode className="text-blue-500 mr-2" />
            <h4 className="tfont-semibold text-black">Pembayaran QRIS</h4>
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
          <p className="text-sm text-gray-600 text-center mb-2">
            Scan kode QR di atas menggunakan aplikasi e-wallet atau mobile banking Anda
          </p>
          <p className="text-xs text-gray-500 text-center mb-4">
            Pembayaran akan diverifikasi secara otomatis
          </p>
          
          <div className="border-t border-gray-200 pt-4 mt-2">
            <p className="text-sm text-gray-700 text-center mb-3">
              Setelah melakukan pembayaran, silakan hubungi kami:
            </p>
            
            <a 
              href={`https://wa.me/6282135626476?text=Halo%2C%20saya%20baru%20saja%20membeli%20produk%20*${encodeURIComponent(productName)}*%20dengan%20harga%20${encodeURIComponent(formattedPrice)}${currentOption ? `%20dengan%20pilihan%20*${encodeURIComponent(currentOption)}*` : ''}.%20Mohon%20informasi%20selanjutnya%20untuk%20pengiriman.%20Terima%20kasih.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] shadow-md"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              Konfirmasi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRISPayment;
