
import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="ofertas" className="py-24 bg-gray-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-pawBlue font-title text-4xl md:text-5xl mb-6">Escolha o Melhor Plano</h2>
          <p className="text-gray-600 font-bold text-xl">Garanta agora a diversão infinita para o seu pequeno!</p>
          <div className="w-32 h-2 bg-pawYellow mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch max-w-4xl mx-auto">
          {/* Plano Básico - R$ 17 */}
          <div className="bg-white rounded-[3rem] p-10 border-2 border-gray-200 shadow-xl flex flex-col fade-in transition-all hover:shadow-2xl">
            <h3 className="text-2xl font-title text-gray-500 mb-6 text-center">Pacote Básico</h3>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 font-semibold"><span className="text-green-500 text-xl">✓</span> Todos os Moldes Patrulha</li>
              <li className="flex items-center gap-3 font-semibold"><span className="text-green-500 text-xl">✓</span> Personagens e Veículos</li>
              <li className="flex items-center gap-3 font-semibold"><span className="text-green-500 text-xl">✓</span> Entrega via E-mail</li>
              <li className="flex items-center gap-3 font-semibold"><span className="text-green-500 text-xl">✓</span> Garantia de 30 dias</li>
              <li className="flex items-center gap-3 text-gray-400 italic font-medium">✕ Sem atualizações futuras</li>
            </ul>
            <div className="mb-8 text-center">
              <p className="text-gray-400 line-through text-lg">R$ 47</p>
              <div className="flex justify-center items-baseline gap-1">
                <span className="text-pawBlue font-bold text-2xl">R$</span>
                <span className="text-6xl font-title text-pawBlue">17,00</span>
              </div>
            </div>
            <a 
              href="https://pay.lowify.com.br/checkout?product_id=qvCjQ1" 
              className="bg-gray-800 hover:bg-black text-white py-5 rounded-2xl font-bold text-center text-xl transition-all hover:scale-[1.02]"
            >
              Comprar Básico
            </a>
          </div>

          {/* Plano Premium - R$ 27 */}
          <div className="bg-white rounded-[3rem] p-10 border-4 border-pawYellow shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col relative transform md:scale-110 z-10 fade-in">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-pawRed text-white px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest whitespace-nowrap shadow-xl">
               🔥 MAIS VENDIDO 🔥
            </div>
            <h3 className="text-2xl font-title text-pawBlue mb-6 text-center">Pacote Premium</h3>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 font-bold text-pawBlue">🌟 Acesso Completo Vitalício</li>
              <li className="flex items-center gap-3 font-bold text-gray-800"><span className="text-green-500 text-xl">✓</span> Atualizações Mensais</li>
              <li className="flex items-center gap-3 font-bold text-gray-800"><span className="text-green-500 text-xl">✓</span> Suporte VIP WhatsApp</li>
              <li className="flex items-center gap-3 font-bold text-gray-800"><span className="text-green-500 text-xl">✓</span> Todos os Cenários Inclusos</li>
              <li className="flex items-center gap-3 font-bold text-gray-800"><span className="text-green-500 text-xl">✓</span> Garantia de 30 dias</li>
            </ul>
            <div className="mb-8 text-center">
              <p className="text-pawRed font-bold text-sm uppercase mb-1">Oferta de Férias</p>
              <p className="text-gray-400 line-through text-lg">R$ 97</p>
              <div className="flex justify-center items-baseline gap-1">
                <span className="text-pawRed font-bold text-2xl">R$</span>
                <span className="text-7xl font-title text-pawRed">27,00</span>
              </div>
            </div>
            <a 
              href="https://pay.lowify.com.br/checkout?product_id=s7OPrg" 
              className="bg-pawRed hover:bg-red-600 text-white py-6 rounded-2xl font-bold text-center text-2xl shadow-xl transition-all hover:scale-[1.03] animate-pulse"
            >
              QUERO O COMPLETO!
            </a>
            <div className="mt-6 flex justify-center gap-4 opacity-70">
               <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" alt="Visa"/>
               <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" alt="Mastercard"/>
               <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-6" alt="Pix"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
