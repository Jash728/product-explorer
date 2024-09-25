import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <AiOutlineLoading3Quarters className="animate-spin text-yellow-500 w-8 h-8" />
    </div>
  );
};

export default LoadingSpinner;