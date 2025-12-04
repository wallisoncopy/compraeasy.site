import React from 'react';
import { 
    ClinicalIcon, 
    HeartIcon, 
    SportIcon, 
    BeautyIcon, 
    BabyIcon, 
    PregnantIcon, 
    GiftIcon 
} from './Icons';
import { FeatureArea } from '../types';

const features: FeatureArea[] = [
  {
    title: "Nutrição Clínica",
    description: "Atendimento clínico especializado",
    iconName: 'clinical'
  },
  {
    title: "Nutrição Comportamental",
    description: "Mudança de hábitos alimentares",
    iconName: 'behavioral'
  },
  {
    title: "Nutrição Esportiva",
    description: "Performance e recuperação",
    iconName: 'sports'
  },
  {
    title: "Nutrição Estética",
    description: "Beleza e bem-estar",
    iconName: 'aesthetic'
  },
  {
    title: "Nutrição Materno-Infantil",
    description: "Cuidado especializado",
    iconName: 'child'
  },
  {
    title: "Nutrição da Gestante",
    description: "Acompanhamento gestacional",
    iconName: 'pregnant'
  }
];

const IconMap = {
    clinical: ClinicalIcon,
    behavioral: HeartIcon,
    sports: SportIcon,
    aesthetic: BeautyIcon,
    child: BabyIcon,
    pregnant: PregnantIcon,
    bonus: GiftIcon
};

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-black text-gray-900 mb-2">
             7 Áreas da Nutrição Cobertas
          </h2>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = IconMap[feature.iconName];
            return (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 md:p-6 text-center hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
          
          {/* Bonus Card */}
          <div className="col-span-2 md:col-span-3 bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl p-6 text-white text-center shadow-lg transform hover:scale-[1.01] transition-transform">
             <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <GiftIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider">10 Bônus Exclusivos</h3>
                    <p className="text-brand-100 text-sm">Materiais extras inclusos para turbinar seu consultório</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;