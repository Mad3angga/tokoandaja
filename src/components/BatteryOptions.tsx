'use client';

import React, { useState } from 'react';
import { FaBatteryFull, FaBatteryHalf } from 'react-icons/fa';

interface BatteryOptionsProps {
  productId: string;
}

const BatteryOptions: React.FC<BatteryOptionsProps> = ({ productId }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const batteryOptions = [
    { 
      id: 'full', 
      label: 'Full Battery', 
      icon: <FaBatteryFull className="text-2xl" /> 
    },
    { 
      id: 'half', 
      label: 'Half Battery', 
      icon: <FaBatteryHalf className="text-2xl" /> 
    }
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // You might want to add additional logic here, such as updating the product in the database
  };

  return (
    <div className="flex space-x-4">
      {batteryOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleOptionSelect(option.id)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg 
            ${selectedOption === option.id 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BatteryOptions;
