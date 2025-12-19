
import React from 'react';

const Hero: React.FC = () => {
  const scrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-pawBlue overflow-hidden py-12 md:py-24">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-pawYellow rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-pawRed rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <h2 className="text-white font-title text-4xl md:text-7xl mb-8 leading-tight max-w-5xl drop-shadow-xl">
          Megapack <span className="bg-pawYellow text-pawBlue px-6 py-2 rounded-3xl inline-block transform -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">Patrulha Canina</span> para recortar e brincar!
        </h2>
        
        <p className="text-blue-50 text-xl md:text-2xl mb-12 max-w-3xl font-semibold leading-relaxed">
          Abandone as telas! A coleção completa de personagens, veículos e cenários para garantir a diversão total da sua criança.
        </p>
        
        <div className="w-full max-w-4xl mb-16 relative">
            <div className="absolute -top-10 -right-10 bg-pawRed text-white p-6 rounded-full font-title text-xl shadow-2xl z-20 animate-bounce hidden md:block border-4 border-white">
                +1200<br/>MOLDES
            </div>
            <img 
                src="https://i.ibb.co/23V3vYpt/Chat-GPT-Image-18-de-dez-de-2025-17-59-33.png" 
                alt="Megapack Patrulha Canina" 
                className="rounded-[40px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-white mx-auto transition-transform hover:scale-[1.01] duration-700 w-full h-auto"
            />
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <a 
            href="#ofertas" 
            onClick={scrollToOffers}
            className="w-full sm:w-auto bg-pawRed hover:bg-red-600 text-white font-bold py-6 px-12 rounded-full text-2xl md:text-3xl shadow-[0_10px_0_0_#990000] transition-all hover:translate-y-1 hover:shadow-[0_5px_0_0_#990000] active:translate-y-2 active:shadow-none text-center"
          >
            QUERO OS MOLDES AGORA!
          </a>
          <div className="flex items-center gap-4 text-white/90 font-bold uppercase tracking-widest text-sm">
             <span>✓ ACESSO VITALÍCIO</span>
             <span className="w-2 h-2 bg-pawYellow rounded-full"></span>
             <span>✓ ENTREGA NO E-MAIL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
