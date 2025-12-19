
import React from 'react';

const Guarantee: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="absolute top-0 left-0 w-24 h-24 bg-pawYellow/20 rounded-full blur-2xl"></div>
        <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-50 p-12 rounded-[3rem] border-2 border-dashed border-pawBlue/30 fade-in shadow-inner">
          <div className="relative flex-shrink-0">
            <div className="w-56 h-56 bg-white border-[12px] border-pawYellow rounded-full flex items-center justify-center shadow-2xl transform -rotate-6">
              <div className="text-center">
                <p className="font-title text-6xl text-pawBlue">30</p>
                <p className="font-bold text-gray-700 text-sm leading-tight">DIAS DE<br/>GARANTIA</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 text-6xl">🛡️</div>
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-title text-pawBlue mb-6">Risco Zero para Você!</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Sua satisfação é nossa missão. Se em até <span className="text-pawRed font-bold">30 dias</span> você não achar que o Megapack Patrulha Canina transformou a rotina da sua casa e trouxe alegria para seu filho, nós devolvemos 100% do seu dinheiro. Sem letras miúdas, sem complicações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
