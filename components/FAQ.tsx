import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import { FaqItem } from '../types';

const faqData: FaqItem[] = [
  {
    question: "Como recebo o material após a compra?",
    answer: "O acesso é 100% digital e imediato. Após a confirmação do pagamento, você receberá os dados de acesso por e-mail em até 5 minutos."
  },
  {
    question: "Funciona no celular e tablet?",
    answer: "Sim! Todo o material está otimizado para celular, tablet e computador. Você pode acessar de qualquer lugar, a qualquer hora."
  },
  {
    question: "Posso imprimir todos os materiais?",
    answer: "Claro! Todos os materiais estão em alta resolução, prontos para impressão profissional. Use quantas vezes quiser."
  },
  {
    question: "Como funciona a garantia de 30 dias?",
    answer: "Você tem 30 dias para testar tudo. Se não gostar por qualquer motivo, é só enviar um e-mail que devolvemos 100% do seu dinheiro."
  },
  {
    question: "Recebo atualizações do material?",
    answer: "Sim! No plano Gold, você recebe atualizações mensais com novos materiais e ferramentas, sempre sem custo adicional."
  },
  {
    question: "O material é baseado em práticas reais?",
    answer: "Absolutamente! Todo o conteúdo foi desenvolvido com base em experiências clínicas reais e melhores práticas da nutrição."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-gray-900">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <button
                className="w-full px-5 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-100 transition-colors"
                onClick={() => toggle(index)}
              >
                <span className="font-bold text-gray-800 text-sm md:text-base">{item.question}</span>
                <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                />
              </button>
              <div 
                className={`px-5 text-gray-600 text-sm md:text-base transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4 border-t border-gray-200 block' : 'max-h-0 hidden'}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <a href="#pricing" className="inline-block px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-colors uppercase tracking-wide">
                GARANTIR MEU ACESSO AGORA
            </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;