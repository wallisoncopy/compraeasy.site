import React from 'react';
import { DownloadIcon, CheckIcon, StarIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
            <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                <span className="text-gray-500 text-sm font-semibold ml-2">(4.9/5.0 de Avaliação)</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-gray-900 leading-tight mb-6">
              <span className="text-brand-600 block text-lg md:text-xl font-bold uppercase tracking-widest mb-2">App Pack Nutri 300</span>
              Mais de 300 ferramentas prontas para nutricionistas que buscam <span className="bg-brand-100 text-brand-700 px-2">resultados reais!</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Tudo pronto, em um só lugar para facilitar seu atendimento e surpreender suas pacientes.
            </p>

            {/* VSL / Video Section */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-10 relative">
                 {/* Blinking Border Effect */}
                 <div className="absolute -inset-2 bg-red-500 rounded-2xl blur-md animate-pulse opacity-60"></div>
                 <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-red-500 bg-black">
                     <div className="relative pt-[177.77%]"> {/* 9:16 Aspect Ratio for Shorts */}
                        <iframe 
                            src="https://www.youtube.com/embed/zYEwg3NrHLc?rel=0&controls=1&modestbranding=1" 
                            title="App Pack Nutri 300 Video"
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                     </div>
                 </div>
            </div>

            {/* Main CTA */}
            <div className="w-full max-w-md mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <a 
                  href="#pricing"
                  className="relative w-full block bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white border-b-4 border-green-800 rounded-xl p-4 md:p-6 shadow-2xl transform active:scale-95 transition-all text-center"
                >
                  <span className="flex items-center justify-center gap-2 text-xl md:text-2xl font-black uppercase tracking-tight">
                    <DownloadIcon className="w-8 h-8" />
                    QUERO MEU ACESSO AGORA
                  </span>
                  <span className="block text-xs md:text-sm font-medium opacity-90 mt-1 uppercase">
                     Com desconto especial hoje
                  </span>
                </a>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-2 text-gray-900 font-bold">
               <span className="text-gray-400 line-through text-lg">DE R$ 97,90</span>
               <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-lg md:text-xl">→ HOJE POR R$ 17,00</span>
            </div>
        </div>

        {/* Hero Image / Pack Preview */}
        <div className="relative max-w-5xl mx-auto mt-8">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-32 bottom-0 w-full"></div>
            <div className="bg-gray-100 rounded-2xl p-2 md:p-4 shadow-2xl border border-gray-200">
                <img 
                  src="https://i.ibb.co/WNqBgHnB/MAIS-DE-300-MATERIAS-PRONTO-PARA-USAR-NUTRI.png" 
                  alt="Pack Nutri Preview" 
                  className="w-full h-auto rounded-xl shadow-inner"
                />
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;