
import React from 'react';

const items = [
  { icon: '🚓', title: 'Chase e Viaturas', desc: 'Moldes detalhados do líder e seu carro de polícia.' },
  { icon: '🚒', title: 'Marshall e Bombeiros', desc: 'O dálmata favorito e seu caminhão de resgate.' },
  { icon: '🚁', title: 'Skye e Helicópteros', desc: 'Pronta para voar com moldes da Skye e suas aeronaves.' },
  { icon: '🏗️', title: 'Rubble e Construção', desc: 'Trator e ferramentas do construtor da equipe.' },
  { icon: '🗼', title: 'Torre de Vigilância', desc: 'O cenário icônico para as crianças montarem seu QG.' },
  { icon: '♻️', title: 'Rocky e Zuma', desc: 'Personagens de reciclagem e resgate aquático com barcos.' },
  { icon: '🛡️', title: 'Crachás e Acessórios', desc: 'Para as crianças se sentirem verdadeiros heróis.' },
  { icon: '🏙️', title: 'Cidade da Aventura', desc: 'Cenários completos para horas de brincadeira.' }
];

const Inventory: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl mb-4">O que você recebe no Megapack Patrulha Canina</h2>
          <p className="text-gray-600 font-medium">Tudo o que sua criança precisa para criar sua própria Baía da Aventura</p>
          <div className="w-24 h-1 bg-pawYellow mx-auto rounded-full mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-pawBlue transition-all fade-in flex flex-col items-center text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-title text-lg text-pawBlue mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inventory;
