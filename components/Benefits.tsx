import React from 'react';
import { CheckIcon } from './Icons';

const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-6 leading-tight text-center lg:text-left">
              Nutri, você não precisa mais fazer tudo <span className="text-orange-500">sozinha!</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 text-center lg:text-left">
              Com o App Pack Nutri 300, você tem acesso imediato a um acervo com mais de 300 materiais prontos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Otimize seu tempo", desc: "Materiais prontos para impressão." },
                    { title: "Fidelize mais pacientes", desc: "Encante com design profissional." },
                    { title: "Aumente o valor percebido", desc: "Ferramentas diferenciadas." },
                    { title: "Tenha mais confiança", desc: "Baseado em práticas clínicas reais." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <CheckIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-white">{item.title}</h4>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center lg:text-left">
                <a href="#pricing" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-orange-500/20">
                    QUERO ESSA PRATICIDADE
                </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
             <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-green-600 p-4 text-center">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">É isso que você leva</h3>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {[
                            "7 áreas da Nutrição",
                            "Materiais prontos (+300)",
                            "Encante e fidelize",
                            "Economize tempo",
                            "Valorize suas consultas",
                            "Base prática real",
                            "Visual profissional"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 font-semibold border-b border-gray-100 pb-2 last:border-0">
                                <CheckIcon className="w-5 h-5 text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;