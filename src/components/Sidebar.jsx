import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-20'} h-screen border-r-[0.8px] border-slate-300  text-black transition-all`}>
      {/* Sidebar content */}
      <div className="flex flex-col items-center p-4 space-y-4">
        {/* Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="text-xl p-2 rounded-full bg-red-400 hover:bg-gray-600 focus:outline-none">
          {isOpen ? 'Close' : 'HVS'}
        </button>

        {/* Sidebar Items */}
        <ul className="space-y-4">
          <li className="text-center">
            <a href="/" className={`block px-4 py-2 ${!isOpen && 'text-center'} hover:bg-gray-600 rounded-md`}>
              {isOpen ? 'Home' : 'H'}
            </a>
          </li>
          <li className="text-center">
            <a href="/about" className={`block px-4 py-2 ${!isOpen && 'text-center'} hover:bg-gray-600 rounded-md`}>
              {isOpen ? 'About' : 'A'}
            </a>
          </li>
          <li className="text-center">
            <a href="/services" className={`block px-4 py-2 ${!isOpen && 'text-center'} hover:bg-gray-600 rounded-md`}>
              {isOpen ? 'Services' : 'S'}
            </a>
          </li>
          <li className="text-center">
            <a href="/contact" className={`block px-4 py-2 ${!isOpen && 'text-center'} hover:bg-gray-600 rounded-md`}>
              {isOpen ? 'Contact' : 'C'}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
