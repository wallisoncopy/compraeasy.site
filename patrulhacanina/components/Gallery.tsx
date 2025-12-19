
import React from 'react';

const Gallery: React.FC = () => {
  const imageUrls = [
    "https://i.ibb.co/jCsjHWL/Chat-GPT-Image-18-de-dez-de-2025-17-59-28.png",
    "https://i.ibb.co/Fbb30WkS/Chat-GPT-Image-18-de-dez-de-2025-17-59-43.png",
    "https://i.ibb.co/0jCmFC2c/Chat-GPT-Image-18-de-dez-de-2025-17-59-40.png",
    "https://i.ibb.co/RTmBJrmM/Chat-GPT-Image-18-de-dez-de-2025-17-59-46.png"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl">Exemplos dos Moldes da Patrulha</h2>
          <p className="text-gray-500 mt-2 font-semibold">Confira o que você vai poder imprimir agora mesmo para sua criança</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {imageUrls.map((url, i) => (
            <div key={i} className="fade-in group">
              <div className="bg-gray-100 rounded-3xl overflow-hidden border-4 border-gray-100 group-hover:border-pawYellow transition-all shadow-lg aspect-square">
                <img 
                    src={url} 
                    alt={`Molde Patrulha Canina Exemplo ${i + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-pawBlue rounded-3xl p-8 text-center text-white fade-in shadow-xl">
            <p className="font-title text-2xl md:text-3xl text-pawYellow">A maior coleção temática da Patrulha Canina!</p>
            <p className="mt-2 text-blue-100 opacity-90 font-medium">Todos os personagens principais e secundários inclusos para imprimir sem limites.</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
