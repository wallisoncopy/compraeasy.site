import React, { useState, useEffect } from 'react';
import { ClockIcon } from './Icons';

const TopBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(305); // 5 min 5 sec

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 305));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#cc0000] text-white z-50 py-3 shadow-lg border-b border-red-800">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wide">
          <span>OFERTA DE HOJE R$ 10 TERMINA EM:</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-xl font-black bg-black/20 px-3 py-1 rounded">
          <ClockIcon className="w-5 h-5 mr-1" />
          <span>{minutes.toString().padStart(2, '0')} min</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, '0')} seg</span>
        </div>
        <a href="#pricing" className="hidden sm:inline-block ml-4 text-xs font-bold bg-white text-red-700 px-3 py-1 rounded uppercase hover:bg-gray-100 transition-colors">
          VER OFERTAS
        </a>
      </div>
    </div>
  );
};

export default TopBar;