
import React from 'react';

const benefits = [
  {
    icon: '✂️',
    title: 'Coordenação Motora',
    desc: 'O ato de recortar e dobrar ajuda no desenvolvimento da coordenação fina das crianças de forma lúdica.'
  },
  {
    icon: '🧠',
    title: 'Raciocínio Lógico',
    desc: 'Montar os personagens estimula o pensamento espacial e a resolução de problemas passo a passo.'
  },
  {
    icon: '📵',
    title: 'Menos Telas',
    desc: 'Proporcione horas de entretenimento offline, reduzindo o tempo de exposição excessiva a celulares e tablets.'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Tempo em Família',
    desc: 'Crie memórias afetivas montando os personagens favoritos junto com seus filhos durante as férias.'
  }
];

const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl mb-4">Por que escolher nossos moldes?</h2>
          <div className="w-24 h-1 bg-pawYellow mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="fade-in bg-gray-50 p-8 rounded-2xl border-b-4 border-pawBlue hover:border-pawYellow transition-all hover:-translate-y-2 group">
              <div className="text-5xl mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-title text-xl mb-3 text-pawBlue">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
