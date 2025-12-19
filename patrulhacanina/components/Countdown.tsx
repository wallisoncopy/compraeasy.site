
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(599);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: any = { day: 'numeric', month: 'long' };
    setCurrentDate(now.toLocaleDateString('pt-BR', options));

    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const scrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-pawYellow py-3 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-pawBlue font-bold sticky top-0 z-[100] shadow-2xl border-b-4 border-pawBlue/20">
      <div className="flex items-center gap-3 text-center md:text-left">
        <span className="text-2xl animate-pulse">🔥</span>
        <span className="text-sm md:text-lg uppercase tracking-wider">
          OFERTA ESPECIAL HOJE, {currentDate.toUpperCase()}
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase opacity-60 hidden sm:block">Expira em:</span>
            <div className="flex gap-1 font-mono bg-pawBlue text-white px-4 py-2 rounded-xl shadow-lg text-lg">
              <span>{String(minutes).padStart(2, '0')}</span>
              <span className="animate-ping">:</span>
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
        </div>
        <a 
          href="#ofertas" 
          onClick={scrollToOffers}
          className="bg-pawRed hover:bg-red-600 text-white text-xs md:text-sm px-6 py-2.5 rounded-full uppercase font-black shadow-xl transition-all hover:scale-110 active:scale-95 border-2 border-white/20"
        >
          VER OFERTAS ➔
        </a>
      </div>
    </div>
  );
};

export default Countdown;
