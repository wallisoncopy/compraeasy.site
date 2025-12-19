
import React from 'react';

const steps = [
  { n: "1", t: "Compre agora", desc: "Escolha seu plano" },
  { n: "2", t: "Receba o e-mail", desc: "Acesso imediato" },
  { n: "3", t: "Escolha o molde", desc: "Navegue no pack" },
  { n: "4", t: "Imprima", desc: "Qualquer papel A4" },
  { n: "5", t: "Recorte", desc: "Siga as linhas" },
  { n: "6", t: "Dobre", desc: "Marcas vincadas" },
  { n: "7", t: "Cole", desc: "Use cola comum" },
  { n: "8", t: "Brinque!", desc: "Crie histórias" }
];

const HowTo: React.FC = () => {
  return (
    <section className="py-20 bg-pawBlue text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-title text-3xl md:text-4xl mb-4 text-pawYellow">Como eu recebo meu material?</h2>
          <p className="text-xl">Basta imprimir, recortar e colar. Sua criança longe de telas nessas férias.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="text-center fade-in">
              <div className="w-12 h-12 bg-pawYellow text-pawBlue rounded-full flex items-center justify-center font-title text-xl mx-auto mb-3 shadow-lg">
                {s.n}
              </div>
              <p className="font-bold text-sm uppercase">{s.t}</p>
              <p className="text-xs opacity-70">{s.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center fade-in">
          <div className="inline-block bg-white text-pawBlue px-8 py-3 rounded-full font-bold shadow-xl">
             ENTREGA IMEDIATA NO E-MAIL 📧
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
