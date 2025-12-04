import React from 'react';
import { StarIcon } from './Icons';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Ana Silva',
    role: 'Nutricionista Clínica',
    initials: 'AS',
    text: "Revolucionou minha prática! Os materiais são incríveis e economizei horas de preparação."
  },
  {
    id: '2',
    name: 'Dra. Carla Santos',
    role: 'Nutricionista Esportiva',
    initials: 'CS',
    text: "Transformou completamente meus atendimentos. O design profissional me deu muito mais credibilidade."
  },
  {
    id: '3',
    name: 'Nutri. Marina Costa',
    role: 'Emagrecimento',
    initials: 'MC',
    text: "Investimento que se pagou no primeiro mês! Consegui aumentar o valor das minhas consultas."
  },
  {
    id: '4',
    name: 'Dra. Juliana Mendes',
    role: 'Materno Infantil',
    initials: 'JM',
    text: "Não consigo mais trabalhar sem o App Pack Nutri 300. É essencial para qualquer nutricionista!"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-gray-900">
            O que as <span className="text-brand-600">profissionais</span> estão falando
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex text-yellow-400 mb-3">
                {[1, 2, 3, 4, 5].map((_, i) => <React.Fragment key={i}><StarIcon className="w-4 h-4 fill-current" /></React.Fragment>)}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <span className="text-xs text-gray-500 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;