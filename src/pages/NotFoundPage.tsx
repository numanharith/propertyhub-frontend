import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-4"> {/* Adjust min-h based on header/footer */}
      <AlertTriangle className="w-24 h-24 text-accent mb-6" />
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors inline-flex items-center"
      >
        <Home className="w-5 h-5 mr-2" />
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
