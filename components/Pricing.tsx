import React from 'react';
import { CheckIcon, LockClosedIcon, ShieldCheckIcon, DownloadIcon } from './Icons';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">Oferta por tempo limitado</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 mt-2">
                Escolha o plano ideal para você
            </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto items-stretch">
          
          {/* Basic Plan */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col relative opacity-80 hover:opacity-100 transition-opacity">
            <div className="text-center border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-700">Plano Básico</h3>
                <p className="text-gray-500 text-sm">Para começar</p>
            </div>
            
            <div className="text-center mb-6">
                 <div className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded mb-2">
                    PLANO DE R$10 SE ENCERROU (ESGOTADO)
                 </div>
                 <div className="flex justify-center items-center gap-2">
                    <span className="text-4xl font-extrabold text-gray-900">R$ 17,00</span>
                 </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                Acesso a 3 áreas da nutrição
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                85 ferramentas completas
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                6 meses de acesso
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                3 bônus exclusivos
              </li>
              <li className="flex gap-3 text-sm text-gray-600">
                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                Pronto para impressão
              </li>
            </ul>

            <a 
                href="https://pay.lowify.com.br/checkout?product_id=dWg7dc"
                className="block w-full text-center py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg border border-gray-300 transition-colors uppercase text-sm"
            >
                GARANTIR ACESSO BÁSICO
            </a>
          </div>

          {/* Gold Plan */}
          <div className="flex-1 bg-white rounded-2xl border-2 border-green-500 p-6 flex flex-col relative shadow-xl transform md:-translate-y-4 z-10">
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md uppercase whitespace-nowrap">
                    🔥 Mais Vendido
                </span>
             </div>

            <div className="text-center border-b border-gray-100 pb-4 mb-4 mt-2">
                <h3 className="text-2xl font-bold text-gray-900">Plano Gold Completo</h3>
                <p className="text-green-600 font-semibold text-sm">Acesso total vitalício</p>
            </div>
            
            <div className="text-center mb-6">
                 <span className="text-gray-400 line-through text-sm">R$ 97,90 Valor normal</span>
                 <div className="flex justify-center items-center gap-2 text-green-600">
                    <span className="text-5xl font-black">R$ 27,00</span>
                 </div>
                 <p className="text-xs text-gray-500 mt-1">Pagamento único • Economize R$ 70,90</p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                7 áreas completas da nutrição
              </li>
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                300+ ferramentas
              </li>
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                Acesso vitalício
              </li>
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                Atualizações mensais
              </li>
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                10 bônus exclusivos
              </li>
              <li className="flex gap-3 font-medium text-gray-800">
                <div className="bg-green-100 p-1 rounded-full"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                Design profissional
              </li>
            </ul>

            <a 
                href="https://pay.lowify.com.br/checkout?product_id=dWg7dc"
                className="block w-full text-center py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl shadow-lg shadow-green-200 transition-all transform hover:scale-105 uppercase tracking-wide text-lg flex items-center justify-center gap-2"
            >
                <DownloadIcon className="w-6 h-6" />
                BAIXAR PACK COMPLETO
            </a>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <LockClosedIcon className="w-3 h-3" />
                Ambiente criptografado e seguro
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
             <ShieldCheckIcon className="w-16 h-16 text-brand-600 flex-shrink-0" />
             <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-900 text-lg">Garantia de 30 Dias</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas! Você tem um mês inteiro para testar tudo e decidir.
                </p>
             </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;