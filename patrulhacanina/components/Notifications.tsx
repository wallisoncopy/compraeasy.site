
import React, { useState, useEffect } from 'react';

const names = [
  "Adriana M.", "Bruna F.", "Cássia L.", "Débora R.", "Eliane S.", 
  "Fernanda O.", "Gisele B.", "Helena P.", "Isabela V.", "Janaína K.",
  "Letícia C.", "Mariana T.", "Nádia G.", "Patrícia D.", "Renata J."
];

const Notifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<{ name: string; time: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = Math.floor(Math.random() * 8) + 1;
      
      setCurrentNotification({ name: randomName, time: `${randomTime} min` });
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 6000);
    };

    const initialTimeout = setTimeout(showRandomNotification, 4000);
    const interval = setInterval(showRandomNotification, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-[200] transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'
      }`}
    >
      <div className="bg-white border-4 border-pawBlue rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 flex items-center gap-5 max-w-[320px]">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg border-2 border-white">
          ✓
        </div>
        <div>
          <p className="text-base font-bold text-gray-800 leading-tight">
            {currentNotification.name} <span className="text-green-600">acabou de comprar</span>
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-extrabold uppercase tracking-tight">
            <span className="text-blue-600 font-title">PIX APROVADO</span>
            <span>•</span>
            <span>Há {currentNotification.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
