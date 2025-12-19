
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-pawBlue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pawRed rounded-full flex items-center justify-center border-2 border-pawYellow shadow-inner">
            <span className="text-2xl">🐾</span>
          </div>
          <h1 className="text-white font-title text-xl md:text-2xl tracking-wide uppercase">
            Megapack <span className="text-pawYellow">Patrulha Canina</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
