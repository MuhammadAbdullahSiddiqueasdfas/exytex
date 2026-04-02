import React from 'react';
import { Link } from 'react-router-dom';

export const SimpleHeader: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Exytex
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};