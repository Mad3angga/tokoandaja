'use client';

import { useState, useEffect } from 'react';
import { getProductById } from '@/lib/products';
import { ProductOption } from '@/lib/products';

interface ProductOptionsProps {
  productId: string;
  basePrice: number;
  options: ProductOption[];
}

const ProductOptions = ({ productId, basePrice, options }: ProductOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(basePrice);

  // Save selected option to localStorage when it changes and update price
  useEffect(() => {
    if (selectedOption) {
      localStorage.setItem(`product_${productId}_option`, selectedOption);
      
      // Update price based on selected option
      const option = options.find(opt => opt.name === selectedOption);
      if (option) {
        setFinalPrice(basePrice + option.priceAdjustment);
      } else {
        setFinalPrice(basePrice);
      }
    }
  }, [selectedOption, productId, basePrice, options]);

  // Load selected option from localStorage on component mount
  useEffect(() => {
    const savedOption = localStorage.getItem(`product_${productId}_option`);
    if (savedOption) {
      setSelectedOption(savedOption);
      
      // Update price based on saved option
      const option = options.find(opt => opt.name === savedOption);
      if (option) {
        setFinalPrice(basePrice + option.priceAdjustment);
      }
    }
  }, [productId, basePrice, options]);

  // Format price in Rupiah
  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };
  
  // Update price and selected option in parent component
  useEffect(() => {
    // Create custom events to notify parent component about price and option changes
    const priceEvent = new CustomEvent('priceUpdate', { 
      detail: { 
        price: finalPrice,
        formattedPrice: formatPrice(finalPrice)
      } 
    });
    window.dispatchEvent(priceEvent);
    
    // Also dispatch selected option information for other components (like QRIS)
    const optionEvent = new CustomEvent('optionUpdate', { 
      detail: { 
        selectedOption: selectedOption
      } 
    });
    window.dispatchEvent(optionEvent);
  }, [finalPrice, selectedOption]);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => setSelectedOption(option.name)}
            className={`px-4 py-2 rounded-lg border ${
              selectedOption === option.name
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            } transition-colors`}
          >
            {option.name}
            {option.priceAdjustment > 0 && (
              <span className="ml-2 text-xs">(+{formatPrice(option.priceAdjustment)})</span>
            )}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="text-sm">
          <p className="text-green-600">
            Anda memilih: <strong>{selectedOption}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
