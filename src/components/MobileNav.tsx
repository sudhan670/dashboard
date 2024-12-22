import React from 'react';
import { Menu } from 'lucide-react';

const MobileNav = () => {
  return (
    <div className="md:hidden bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Quyl</h1>
        <button className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;