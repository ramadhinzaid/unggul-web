import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Unggul Web</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <Link
            to="/unggul-web/"
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/unggul-web/customers"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            Customers
          </Link>
          <Link
            to="/unggul-web/stock"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            Stock
          </Link>
          <Link
            to="/unggul-web/sales"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            Sales
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
