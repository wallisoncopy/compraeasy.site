
import React, { useState } from 'react';

const faqs = [
  {
    q: "Como recebo os moldes?",
    a: "O acesso é imediato! Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todos os arquivos em PDF."
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos Pix, cartão de crédito com parcelamento e boleto bancário através de nossa plataforma segura."
  },
  {
    q: "É tudo digital?",
    a: "Sim, é um produto 100% digital. Você recebe os arquivos em PDF para imprimir em casa ou em uma gráfica."
  },
  {
    q: "Preciso de uma impressora especial?",
    a: "Não! Qualquer impressora comum funciona. Para um resultado melhor, recomendamos papel de gramatura 180g (tipo cartolina)."
  },
  {
    q: "Posso imprimir quantas vezes quiser?",
    a: "Sim! O acesso é vitalício. Você pode imprimir o mesmo molde infinitas vezes para brincar ou decorar."
  },
  {
    q: "Tenho acesso por quanto tempo?",
    a: "O seu acesso é vitalício. Uma vez adquirido, o pack é seu para sempre."
  },
  {
    q: "Funciona para escolas?",
    a: "Sim! Muitos professores utilizam nosso material em sala de aula para atividades lúdicas e psicomotoras."
  },
  {
    q: "E se eu tiver alguma dúvida ou problema?",
    a: "Temos um suporte dedicado via WhatsApp para ajudar você com qualquer dúvida na montagem ou acesso."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-pawBlue font-title text-3xl md:text-4xl">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="fade-in border-2 border-gray-100 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-gray-800 text-sm md:text-base">{faq.q}</span>
                <span className="text-pawBlue">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="p-4 bg-white border-t-2 border-gray-100">
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
