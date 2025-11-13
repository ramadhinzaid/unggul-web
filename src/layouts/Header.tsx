import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b-4 border-blue-600">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-700">AdminLTE</span>
      </div>
    </header>
  );
};

export default Header;
