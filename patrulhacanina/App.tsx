
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Gallery from './components/Gallery';
import HowTo from './components/HowTo';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Countdown from './components/Countdown';
import Notifications from './components/Notifications';

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body antialiased overflow-x-hidden selection:bg-pawYellow selection:text-pawBlue">
      <main>
        <Countdown />
        <Hero />
        
        {/* Marquee de benefícios */}
        <div className="py-6 bg-pawBlue/5 flex justify-center overflow-hidden border-b-2 border-pawBlue/10">
            <div className="flex gap-20 items-center animate-scroll whitespace-nowrap">
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 PATRULHA CANINA EM AÇÃO</span>
                <span className="font-black text-pawRed/40 text-sm italic">🐾 ENTREGA NO E-MAIL</span>
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 ACESSO VITALÍCIO</span>
                <span className="font-black text-pawRed/40 text-sm italic">🐾 BRINQUE SEM TELAS</span>
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 MOLDES EM ALTA QUALIDADE</span>
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 PATRULHA CANINA EM AÇÃO</span>
                <span className="font-black text-pawRed/40 text-sm italic">🐾 ENTREGA NO E-MAIL</span>
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 ACESSO VITALÍCIO</span>
                <span className="font-black text-pawRed/40 text-sm italic">🐾 BRINQUE SEM TELAS</span>
                <span className="font-black text-pawBlue/40 text-sm italic">🐾 MOLDES EM ALTA QUALIDADE</span>
            </div>
        </div>

        <Inventory />
        <Gallery />
        <HowTo />
        <Pricing />
        
        <div className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="flex flex-col items-center gap-4 fade-in group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">🛡️</div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Garantia 30 Dias</p>
                </div>
                <div className="flex flex-col items-center gap-4 fade-in group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">🔒</div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Compra Segura</p>
                </div>
                <div className="flex flex-col items-center gap-4 fade-in group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">⚡</div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Acesso Imediato</p>
                </div>
                <div className="flex flex-col items-center gap-4 fade-in group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">🖨️</div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Imprima Sempre</p>
                </div>
            </div>
        </div>

        <Testimonials />
        <Guarantee />
        <FAQ />

        {/* Final CTA com Visual Impactante */}
        <div className="bg-pawBlue py-24 text-center px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-pawYellow shadow-xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-white text-4xl md:text-6xl font-title mb-10 leading-tight">Não Deixe Seu Filho<br/>Só no Celular!</h2>
                <p className="text-blue-100 text-xl md:text-2xl mb-14 font-semibold opacity-90">Ocupação saudável, criativa e divertida com a Patrulha Canina.</p>
                <a 
                  href="#ofertas" 
                  className="w-full sm:w-auto bg-pawYellow hover:bg-yellow-400 text-pawBlue font-black py-8 px-16 rounded-full text-2xl md:text-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 inline-block border-b-8 border-pawBlue/20"
                >
                  GARANTIR MEU ACESSO AGORA!
                </a>
                <p className="mt-8 text-white/50 text-sm font-bold">Oferta por tempo limitado. Preço promocional de férias.</p>
            </div>
        </div >
      </main>
      <Footer />
      <Notifications />
    </div>
  );
};

export default App;
