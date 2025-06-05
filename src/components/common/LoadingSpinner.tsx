import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 12, text = "Loading...", className="" }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-10 ${className}`}>
      <Loader2 className={`w-${size} h-${size} text-primary animate-spin mx-auto`} />
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
