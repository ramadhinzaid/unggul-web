import { Menu } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b-4 border-blue-600">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden">
          <Menu />
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-700">AdminLTE</span>
      </div>
    </header>
  );
};

export default Header;
