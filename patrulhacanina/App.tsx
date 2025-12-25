
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  Clock, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  PawPrint
} from 'lucide-react';

// --- Types ---
interface Notification {
  id: number;
  text: string;
}

// --- Components ---

const StickyOfferBar = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const todayStr = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white p-2 shadow-lg flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 font-bold">
      <div className="text-xs md:text-sm uppercase tracking-widest">
        🔥 OFERTA HOJE, {todayStr}
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-white text-red-600 px-3 py-1 rounded flex items-center gap-2 text-sm">
          <Clock size={14} />
          <span className="tabular-nums font-black">{formatTime(timeLeft)}</span>
        </div>
        <a 
          href="#ofertas" 
          className="bg-yellow-400 text-red-950 px-4 py-1 rounded-full hover:bg-yellow-300 transition-colors flex items-center gap-1 text-xs md:text-sm"
        >
          VER OFERTAS <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

const SaleNotification = () => {
  const [notif, setNotif] = useState<Notification | null>(null);
  // Female-only names as requested
  const names = ['Ana', 'Mariana', 'Clara', 'Beatriz', 'Juliana', 'Fernanda', 'Camila', 'Letícia', 'Amanda', 'Bruna', 'Patrícia', 'Renata'];

  useEffect(() => {
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      setNotif({ id: Date.now(), text: `${name} acabou de comprar o Megapack! 🐾` });
      
      setTimeout(() => setNotif(null), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!notif) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto z-[60] bg-white border-l-4 border-green-600 shadow-2xl p-4 rounded-r animate-bounce duration-1000">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full shrink-0">
          <ShoppingBag className="text-green-700" size={20} />
        </div>
        <p className="text-slate-900 font-black text-sm leading-tight">{notif.text}</p>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors gap-4"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
      </button>
      {isOpen && <div className="mt-3 text-slate-800 leading-relaxed font-semibold">{answer}</div>}
    </div>
  );
};

const App = () => {
  return (
    <div className="pt-24 md:pt-16 min-h-screen text-slate-900">
      <StickyOfferBar />
      <SaleNotification />

      {/* Header */}
      <header className="bg-white py-4 md:py-6 border-b sticky top-[72px] md:top-[48px] z-40">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="text-blue-600"><PawPrint size={32} className="md:w-10 md:h-10" fill="currentColor" /></div>
            <h1 className="text-xl md:text-3xl font-black text-slate-950">
              MEGAPACK <span className="text-blue-600">PATRULHA CANINA</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-5xl font-black text-slate-950 mb-6 leading-tight">
            Megapack <span className="text-red-600 underline decoration-yellow-400 decoration-4 underline-offset-4">Patrulha Canina</span> para recortar, colar e brincar longe das telas!
          </h2>
          <p className="text-base md:text-xl text-slate-800 mb-8 max-w-3xl mx-auto font-bold">
            A coleção completa de moldes de todos os personagens: veículos, cenários e crachás para garantir a diversão total nas férias.
          </p>

          {/* UGC VIDEO - VERTICAL STYLE WITH FLASHING BORDER */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border-[6px] animate-flash-border shadow-2xl">
              <iframe 
                src="https://www.youtube.com/embed/zYEwg3NrHLc?autoplay=1&mute=1&loop=1&playlist=zYEwg3NrHLc" 
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="UGC Video VSL"
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase pointer-events-none shadow-md">
                Ao Vivo
              </div>
            </div>
          </div>

          {/* Hero Image - Low Resolution Effect & Smaller Scale */}
          <div className="mb-10 flex flex-col items-center px-4">
            <p className="text-xs font-black text-slate-600 mb-2 uppercase tracking-tighter">Amostra do Material (Digital)</p>
            <div className="max-w-[280px] md:max-w-sm w-full mx-auto rounded-2xl overflow-hidden border-4 border-dashed border-slate-300 filter contrast-75 brightness-110 opacity-90 shadow-inner">
              <img 
                src="https://i.ibb.co/23V3vYpt/Chat-GPT-Image-18-de-dez-de-2025-17-59-33.png" 
                alt="Megapack Patrulha Canina"
                className="w-full h-auto grayscale-[20%] blur-[0.5px]"
                loading="lazy"
              />
            </div>
          </div>

          <a 
            href="#ofertas" 
            className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-6 md:px-10 py-4 md:py-6 rounded-full text-lg md:text-2xl font-black shadow-[0_10px_0_0_#15803d] hover:shadow-[0_5px_0_0_#15803d] hover:translate-y-[5px] active:translate-y-[8px] active:shadow-none transition-all mb-6 uppercase w-full md:w-auto"
          >
            EU QUERO O MEGAPACK <ShoppingBag size={24} />
          </a>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-slate-600 font-black uppercase tracking-tight">
            <span>✓ Acesso Vitalício</span>
            <span className="hidden md:block text-slate-300">•</span>
            <span>✓ Entrega Instantânea por E-mail</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-yellow-400 py-4 overflow-hidden border-y-2 border-yellow-500">
        <div className="animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-yellow-950 font-black mx-8 text-xs md:text-base flex items-center gap-3 uppercase">
              <PawPrint size={18} fill="currentColor" /> PATRULHA CANINA EM AÇÃO • ENTREGA NO E-MAIL • ACESSO VITALÍCIO • BRINQUE SEM TELAS
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-950 uppercase tracking-tighter">O que você recebe no Megapack</h2>
            <p className="text-slate-800 font-bold">Tudo o que sua criança precisa para criar sua própria Baía da Aventura</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚓', title: 'Chase e Viaturas', desc: 'Moldes detalhados do líder e seu carro de polícia.' },
              { icon: '🚒', title: 'Marshall e Bombeiros', desc: 'O dálmata favorito e seu caminhão de resgate.' },
              { icon: '🚁', title: 'Skye e Helicópteros', desc: 'Pronta para voar com moldes da Skye.' },
              { icon: '🗼', title: 'Torre de Vigilância', desc: 'O QG completo para horas de diversão.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all text-center">
                <span className="text-6xl mb-4 block drop-shadow-md">{item.icon}</span>
                <h3 className="text-xl font-black mb-2 text-slate-950 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-900 text-sm leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-950 uppercase tracking-tighter">Exemplos dos Moldes</h2>
            <p className="text-slate-800 font-bold">Confira o que você vai poder imprimir agora mesmo</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "https://i.ibb.co/jCsjHWL/Chat-GPT-Image-18-de-dez-de-2025-17-59-28.png",
              "https://i.ibb.co/Fbb30WkS/Chat-GPT-Image-18-de-dez-de-2025-17-59-43.png",
              "https://i.ibb.co/0jCmFC2c/Chat-GPT-Image-18-de-dez-de-2025-17-59-40.png",
              "https://i.ibb.co/RTmBJrmM/Chat-GPT-Image-18-de-dez-de-2025-17-59-46.png"
            ].map((url, i) => (
              <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform border-4 border-white group">
                <img src={url} alt={`Molde ${i}`} className="w-full h-full object-cover p-2 group-hover:p-0 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - REFINED FOR MAXIMUM LEGIBILITY */}
      <section id="ofertas" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-950 uppercase tracking-tighter">Escolha o seu Plano</h2>
            <p className="text-slate-800 font-black text-lg">Aproveite o preço promocional de hoje!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Basic - Darker text on white */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border-4 border-slate-300 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all">
              <div>
                <h3 className="text-2xl font-black mb-8 text-slate-950 border-b-4 border-slate-200 pb-4 uppercase tracking-tight">PACOTE BÁSICO</h3>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start gap-3 font-black text-slate-900 leading-tight">
                    <CheckCircle size={22} className="text-green-600 shrink-0 mt-0.5" /> 
                    <span>Todos os Moldes Patrulha Canina</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-slate-900 leading-tight">
                    <CheckCircle size={22} className="text-green-600 shrink-0 mt-0.5" /> 
                    <span>Entrega Imediata por E-mail</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-slate-900 leading-tight">
                    <CheckCircle size={22} className="text-green-600 shrink-0 mt-0.5" /> 
                    <span>Garantia de 30 dias</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-slate-400 leading-tight italic decoration-slate-300 line-through">
                    <span className="w-5 text-center shrink-0">✕</span> 
                    <span>Sem Atualizações Mensais</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <span className="line-through text-slate-500 text-lg block mb-1 font-black">DE R$ 47</span>
                  <div className="text-6xl font-black text-slate-950 tracking-tighter">R$ 17,00</div>
                </div>
                <a 
                  href="https://pay.lowify.com.br/checkout?product_id=qvCjQ1" 
                  className="block w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 hover:scale-105 transition-all shadow-[0_6px_0_0_#1e293b] active:translate-y-[4px] active:shadow-none uppercase tracking-tight"
                >
                  COMPRAR BÁSICO
                </a>
              </div>
            </div>

            {/* Premium - High contrast dark blue theme */}
            <div className="bg-blue-600 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between relative shadow-[0_20px_50px_rgba(37,99,235,0.3)] scale-105 border-[6px] border-blue-400">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-950 font-black px-6 py-2 rounded-full text-sm uppercase border-4 border-white shadow-lg whitespace-nowrap z-10">
                ⭐ O MAIS VENDIDO ⭐
              </div>
              <div>
                <h3 className="text-2xl font-black mb-8 text-white border-b-4 border-blue-500/50 pb-4 uppercase tracking-tight">PACOTE PREMIUM</h3>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start gap-3 font-black text-white leading-tight">
                    <CheckCircle size={22} className="text-yellow-400 shrink-0 mt-0.5" fill="white" /> 
                    <span>Todos os Moldes Patrulha Canina</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-white leading-tight">
                    <CheckCircle size={22} className="text-yellow-400 shrink-0 mt-0.5" fill="white" /> 
                    <span>Novos Moldes TODO MÊS</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-white leading-tight">
                    <CheckCircle size={22} className="text-yellow-400 shrink-0 mt-0.5" fill="white" /> 
                    <span>Suporte VIP via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-white leading-tight">
                    <CheckCircle size={22} className="text-yellow-400 shrink-0 mt-0.5" fill="white" /> 
                    <span>Acesso Vitalício Garantido</span>
                  </li>
                  <li className="flex items-start gap-3 font-black text-white leading-tight">
                    <CheckCircle size={22} className="text-yellow-400 shrink-0 mt-0.5" fill="white" /> 
                    <span>Garantia de 30 Dias</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="mb-6">
                  <span className="line-through text-blue-300 text-lg block mb-1 font-black">DE R$ 97</span>
                  <div className="text-7xl font-black text-white tracking-tighter drop-shadow-lg">R$ 27,00</div>
                </div>
                <a 
                  href="https://pay.lowify.com.br/checkout?product_id=s7OPrg" 
                  className="block w-full bg-yellow-400 text-blue-950 py-6 rounded-2xl font-black text-2xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-[0_8px_0_0_#a16207] active:translate-y-[4px] active:shadow-none uppercase tracking-tight"
                >
                  QUERO O COMPLETO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 border-4 border-slate-200">
            <div className="bg-yellow-400 p-6 rounded-full flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 shrink-0 border-8 border-yellow-100 shadow-lg group hover:rotate-12 transition-transform duration-300">
              <span className="text-5xl md:text-6xl font-black text-yellow-950 leading-none">30</span>
              <span className="text-[10px] md:text-xs font-black text-yellow-900 uppercase text-center mt-1 leading-tight">Dias de<br/>Garantia</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black mb-4 flex flex-col md:flex-row items-center gap-3 text-slate-950 uppercase tracking-tighter">
                <ShieldCheck className="text-green-600 w-10 h-10 shrink-0" /> Compra 100% Segura!
              </h3>
              <p className="text-slate-800 leading-relaxed font-black text-sm md:text-base">
                Se em 30 dias você não ficar satisfeito com a qualidade dos moldes, devolvemos todo o seu dinheiro sem burocracia. Teste sem riscos! Confiamos na diversão que a Patrulha vai levar para sua casa e no tempo de qualidade longe das telas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-slate-950 uppercase tracking-tighter">O que as famílias dizem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { q: "Meu filho amou montar o Chase! Entrega imediata.", a: "Ana Paula" },
              { q: "Material excelente, fácil de imprimir. Recomendo!", a: "Mariana S." },
              { q: "Ficamos horas brincando longe do tablet.", a: "Clara M." },
              { q: "Perfeito para as férias. Crianças entretidas.", a: "Beatriz L." },
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
                <div className="flex text-yellow-500 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-900 font-black italic mb-6 leading-snug">"{t.q}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs uppercase">
                    {t.a.charAt(0)}
                  </div>
                  <p className="font-black text-sm text-slate-950">{t.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-slate-950 uppercase tracking-tighter">Dúvidas Frequentes</h2>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border-4 border-white">
            <FaqItem 
              question="Como recebo os moldes?" 
              answer="O acesso é 100% imediato! Após a confirmação do pagamento, você recebe automaticamente um link no seu e-mail para acessar nossa plataforma exclusiva e baixar todos os PDFs." 
            />
            <FaqItem 
              question="É um produto enviado pelo correio?" 
              answer="Não. Trata-se de um produto 100% digital em formato PDF. Você baixa o arquivo e imprime em casa ou em qualquer gráfica. Isso nos permite manter o preço baixo e a entrega instantânea." 
            />
            <FaqItem 
              question="Qual o melhor papel para imprimir?" 
              answer="Você pode usar o papel sulfite A4 comum (75g), mas para uma experiência incrível e brinquedos que duram mais, recomendamos o papel de 180g (tipo Offset ou Cartolina)." 
            />
            <FaqItem 
              question="O acesso expira depois de um tempo?" 
              answer="Absolutamente não! O seu acesso é vitalício. Você compra hoje e o material é seu para sempre, podendo imprimir quantas vezes quiser ao longo dos anos." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8 text-white">
            <PawPrint size={32} fill="currentColor" />
            <span className="font-black text-2xl tracking-tighter">MEGAMOLDES KIDS</span>
          </div>
          <p className="text-sm font-black mb-6">&copy; 2025 Megamoldes Kids • Diversão Offline para Crianças</p>
          <div className="max-w-2xl mx-auto space-y-4 opacity-40">
            <p className="text-[10px] leading-relaxed font-black uppercase tracking-widest">
              Aviso Legal: Este produto não possui afiliação oficial com as marcas Spin Master ou Nickelodeon. Marcas pertencem aos respectivos donos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
