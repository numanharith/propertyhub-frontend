import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title = "Error", className = "" }) => {
  if (!message) return null;

  return (
    <div className={`bg-red-50 border-l-4 border-red-400 p-4 rounded-md ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-700">{title}</h3>
          <div className="mt-1 text-sm text-red-600">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
