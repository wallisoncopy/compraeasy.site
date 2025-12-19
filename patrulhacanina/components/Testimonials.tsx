
import React from 'react';

const testimonials = [
  {
    name: "Ana Paula",
    text: "Meu filho amou montar o Chase e o Marshall, vale cada centavo! A entrega foi super rápida no e-mail logo após o pagamento.",
    stars: 5
  },
  {
    name: "Marcos L.",
    text: "Material de excelente qualidade, todos os personagens da Patrulha Canina em PDF e fáceis de imprimir. Superou as expectativas!",
    stars: 5
  },
  {
    name: "Clara M.",
    text: "Perfeito para as férias! As crianças ficam ocupadas montando os bonecos e depois brincam por horas. O melhor pack temático que já vi.",
    stars: 5
  },
  {
    name: "Mariana S.",
    text: "Eles ficam entretidos e longe das telas montando o QG e os carros. Recomendo muito para todas as mães de fãs da Patrulha Canina.",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-pawBlue/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl mb-4">O Que as Famílias Estão Dizendo</h2>
          <p className="text-gray-600 font-medium">Veja por que o nosso Megapack Patrulha Canina é um sucesso absoluto!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="fade-in bg-white p-6 rounded-2xl shadow-md flex flex-col border border-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pawYellow rounded-full flex items-center justify-center text-xl shadow-sm border border-white">👤</div>
                <p className="font-bold text-pawBlue">{t.name}</p>
              </div>
              <p className="text-gray-700 italic flex-grow text-sm leading-relaxed">"{t.text}"</p>
              <div className="text-pawYellow mt-4 flex gap-1">
                {"★".repeat(t.stars)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
