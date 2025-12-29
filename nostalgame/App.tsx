
import React, { useState, useEffect } from 'react';
import { CHECKOUT_URL, PRODUCT_PRICE, FAQ_ITEMS, BENEFITS, STEPS } from './constants';

const App: React.FC = () => {
  const handleCTAClick = () => {
    console.log("cta_click");
    window.open(CHECKOUT_URL, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero onCTA={handleCTAClick} />
      <HowItWorks />
      <Benefits />
      <WhatYouReceive />
      <ForWho />
      <Testimonial />
      <FAQ />
      <FinalCTA onCTA={handleCTAClick} />
      <Footer />
      <StickyMobileCTA onCTA={handleCTAClick} />
    </div>
  );
};

const Hero: React.FC<{ onCTA: () => void }> = ({ onCTA }) => (
  <section className="relative pt-12 pb-16 md:pt-32 md:pb-24 bg-carbon overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b md:bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs md:text-sm font-bold mb-6 tracking-wider uppercase">
            🔥 Oferta de Lançamento
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Need for Speed: Most Wanted no seu celular por <span className="text-orange-500 whitespace-nowrap">R$ {PRODUCT_PRICE}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Reviva a nostalgia das corridas urbanas e perseguições policiais com instalação simples e entrega imediata no e-mail.
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-md mx-auto md:mx-0">
            {BENEFITS.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300 text-sm md:text-base">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px]">✓</span>
                {b.title}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={onCTA}
              className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg md:text-xl transition-all glow-orange transform hover:-translate-y-1 active:scale-95"
            >
              Quero jogar agora
            </button>
            <p className="text-xs md:text-sm text-slate-500">
              ⚡ Acesso imediato após confirmação
            </p>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-[320px] md:max-w-none order-1 md:order-2 mb-8 md:mb-0">
           <div className="relative group">
              <div className="absolute -inset-2 bg-orange-500/20 rounded-3xl blur-2xl group-hover:bg-orange-500/30 transition-all"></div>
              <div className="relative bg-slate-800 border border-slate-700 p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-2xl rotate-1 md:rotate-3 transition-transform hover:rotate-0">
                <img 
                  src="https://i.ibb.co/hF4HB3XV/Chat-GPT-Image-28-de-dez-de-2025-20-23-53.png" 
                  alt="Need for Speed Most Wanted Mobile Gameplay" 
                  className="rounded-xl md:rounded-2xl w-full h-auto object-cover shadow-inner"
                  loading="eager"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10 md:hidden">
                    <span className="text-white font-bold text-xs uppercase tracking-tighter">Gameplay Mobile</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                    </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="py-16 md:py-20 bg-slate-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 md:text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona?</h2>
        <p className="text-slate-400">Três passos simples para começar a correr.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {STEPS.map((s, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-800 p-6 md:p-8 rounded-2xl text-center relative hover:bg-slate-800/60 transition-colors">
            <div className="text-3xl md:text-4xl mb-4 md:mb-6 bg-slate-700/30 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl mx-auto border border-slate-700">
              {s.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{s.title}</h3>
            <p className="text-sm md:text-base text-slate-400">{s.description}</p>
            {i < 2 && (
               <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-700 text-3xl">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits: React.FC = () => (
  <section className="py-16 md:py-20 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center md:text-left">Benefícios Exclusivos</h2>
          <div className="grid gap-4 md:gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/20 md:bg-transparent hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700">
                <div className="text-2xl md:text-3xl">{b.icon}</div>
                <div>
                  <h4 className="font-bold text-base md:text-lg text-slate-200">{b.title}</h4>
                  <p className="text-slate-400 text-xs md:text-sm">Garantia de qualidade e facilidade no seu entretenimento.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl">
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Status da Entrega</span>
                <span className="text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Online Agora
                </span>
              </div>
              <div className="h-3 md:h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[98%] transition-all duration-1000"></div>
              </div>
              <p className="text-sm md:text-base text-slate-400 italic leading-relaxed pt-2">"Melhor investimento pra quem quer matar a saudade do PS2 no busão. Instalação foi de boa, o tutorial ajuda muito."</p>
              <div className="flex items-center gap-3 pt-2">
                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-orange-500 border border-slate-600">L</div>
                 <span className="text-sm font-bold text-slate-300">Lucas M. <span className="text-slate-600 font-normal ml-1">vía WhatsApp</span></span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const WhatYouReceive: React.FC = () => (
  <section className="py-16 md:py-20 bg-carbon">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl md:rounded-3xl p-6 md:p-12 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">O que você recebe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           {[
             { t: "O Jogo Completo", d: "Arquivos otimizados para seu celular." },
             { t: "Tutorial em Vídeo/Texto", d: "Passo a passo sem erro." },
             { t: "Arquivos Organizados", d: "Nada de pastas confusas." },
             { t: "Suporte Básico", d: "Canal aberto para dúvidas." }
           ].map((item, i) => (
             <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50">
                <span className="text-orange-500 mt-1 font-bold text-xl">✓</span>
                <div>
                  <h4 className="font-bold text-slate-200">{item.t}</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-tight mt-1">{item.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </section>
);

const ForWho: React.FC = () => (
  <section className="py-16 md:py-20 bg-slate-900">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Para quem é este pacote?</h2>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
        {["Fãs de Nostalgia", "Amantes de Corridas", "Gamers Mobile", "Procurando Diversão Rápida", "Sem Tempo para Complicações"].map((tag, i) => (
          <span key={i} className="px-4 py-2 md:px-6 md:py-3 bg-slate-800 rounded-full border border-slate-700 text-slate-300 font-semibold text-xs md:text-sm whitespace-nowrap">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Testimonial: React.FC = () => (
  <section className="py-16 md:py-20 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-6 max-w-2xl text-center">
      <div className="text-4xl md:text-5xl text-orange-500 mb-6 opacity-50">"</div>
      <p className="text-xl md:text-2xl font-medium text-slate-200 mb-8 italic leading-relaxed">
        "Sempre quis jogar o Most Wanted clássico no meu Android e nunca achei um jeito fácil. Esse pacote resolveu tudo. Jogo roda liso e as perseguições policiais são idênticas ao PC!"
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white shadow-lg">R</div>
        <div className="text-left">
          <p className="font-bold text-slate-200 text-sm md:text-base">Ricardo S.</p>
          <div className="flex items-center gap-1 text-orange-400 text-[10px] md:text-xs">
              <span>★★★★★</span>
              <span className="text-slate-500 ml-1">Cliente Verificado</span>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-600 mt-12 uppercase tracking-widest font-bold">Aviso: Resultados e performance podem variar conforme o hardware do dispositivo.</p>
    </div>
  </section>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Dúvidas Frequentes</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-800/20">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-slate-800/40 transition-all font-semibold text-sm md:text-base group"
              >
                <span className="pr-4">{item.question}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-slate-700 text-[10px] transform transition-transform ${openIndex === i ? 'rotate-180 bg-orange-500 border-orange-500 text-white' : 'group-hover:border-slate-500'}`}>▼</span>
              </button>
              {openIndex === i && (
                <div className="p-4 md:p-5 bg-slate-900/50 text-slate-400 text-xs md:text-sm border-t border-slate-800 leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA: React.FC<{ onCTA: () => void }> = ({ onCTA }) => (
  <section className="py-20 bg-gradient-to-b from-slate-900 to-black text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    <div className="container mx-auto px-6">
       <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Pronto para reviver a emoção?</h2>
          <p className="text-lg md:text-xl text-slate-400 mb-10">Tenha o jogo mais lendário da franquia no seu bolso por apenas R$ {PRODUCT_PRICE}.</p>
          <button 
            onClick={onCTA}
            className="w-full sm:w-auto px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl text-xl md:text-2xl transition-all glow-orange transform hover:scale-105 active:scale-95"
          >
            QUERO JOGAR AGORA
          </button>
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="flex items-center gap-2 text-xs font-bold">🔒 Compra 100% Segura</span>
            <span className="flex items-center gap-2 text-xs font-bold">📧 Entrega via E-mail</span>
            <span className="flex items-center gap-2 text-xs font-bold">💳 Pagamento Único</span>
          </div>
       </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 bg-black border-t border-slate-900 text-slate-600 text-[10px] md:text-xs">
    <div className="container mx-auto px-6 text-center">
      <div className="flex justify-center gap-6 mb-8 text-slate-400 font-bold uppercase tracking-tighter">
        <a href="#" className="hover:text-orange-500 transition-colors">Termos</a>
        <a href="#" className="hover:text-orange-500 transition-colors">Privacidade</a>
        <a href="mailto:contato@exemplo.com" className="hover:text-orange-500 transition-colors">Suporte</a>
      </div>
      <p className="max-w-3xl mx-auto leading-relaxed mb-6 px-4">
        Need for Speed é uma marca comercial de seus respectivos proprietários. Esta página é um serviço de curadoria, organização de arquivos e fornecimento de tutoriais de instalação para uso pessoal. Não temos afiliação oficial com a Electronic Arts ou subsidiárias. Os arquivos fornecidos são para fins educacionais e de preservação.
      </p>
      <div className="w-16 h-px bg-slate-800 mx-auto mb-6"></div>
      <p>© 2024 NFS Mobile Hub - Todos os direitos reservados.</p>
    </div>
  </footer>
);

const StickyMobileCTA: React.FC<{ onCTA: () => void }> = ({ onCTA }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 md:hidden z-50 flex items-center justify-between gap-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex flex-col">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Oferta Exclusiva</p>
        <p className="text-xl font-black text-white">R$ {PRODUCT_PRICE}</p>
      </div>
      <button 
        onClick={onCTA}
        className="flex-1 px-4 py-3 bg-orange-500 text-white font-black rounded-xl text-sm transition-all shadow-lg active:scale-95 uppercase tracking-tighter glow-orange"
      >
        COMPRAR AGORA
      </button>
    </div>
  );
};

export default App;
