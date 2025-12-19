
import React from 'react';

const bonuses = [
  {
    title: "Bônus 1 — 100 Atividades Psicomotoras",
    desc: "Personagens fofos para imprimir e colorir.",
    icon: "🎨"
  },
  {
    title: "Bônus 2 — 50 Bobbie Goods para Colorir",
    desc: "Personagens fofos para imprimir e colorir.",
    icon: "🐱"
  },
  {
    title: "Bônus 3 — 100 Moldes de Quebra-Cabeça",
    desc: "Atividades que estimulam o raciocínio e a coordenação.",
    icon: "🧩"
  },
  {
    title: "Bônus 4 — 12 Meses de Atualizações",
    desc: "50 novos moldes enviados todos os meses.",
    icon: "📅"
  }
];

const Bonus: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl mb-4">Além dos 1.200 moldes, você recebe estes 4 bônus exclusivos:</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bonuses.map((b, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-pawBlue flex items-start gap-6 fade-in">
              <span className="text-5xl">{b.icon}</span>
              <div>
                <h3 className="font-title text-xl text-pawBlue mb-2">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bonus;
