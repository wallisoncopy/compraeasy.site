
import React, { useEffect, useState, useCallback } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Smartphone, 
  Edit3, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Star,
  ShoppingBag,
  Instagram,
  Check
} from 'lucide-react';

// --- Components ---

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const GoldDivider = () => (
  <div className="flex justify-center items-center gap-4 my-8">
    <div className="h-[1px] w-12 bg-gold/50"></div>
    <div className="w-2 h-2 rounded-full bg-gold"></div>
    <div className="h-[1px] w-12 bg-gold/50"></div>
  </div>
);

const CTAButton = ({ text, price, onClick }: { text: string, price?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="cta-glow bg-rose-gold hover:bg-[#a05d68] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-lg md:text-xl shadow-lg w-full md:w-auto"
  >
    <ShoppingBag size={24} />
    <span>{text} {price && <span className="opacity-90 ml-1">por apenas {price}</span>}</span>
  </button>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(894); // 14:54 initially
  const [showNotification, setShowNotification] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState("");

  const femaleNames = [
    "Meire D.", "Juliana F.", "Patrícia R.", "Fernanda S.", "Larissa M.", 
    "Amanda K.", "Beatriz L.", "Camila O.", "Daniella G.", "Emanuelle V.",
    "Gabriele P.", "Heloísa C.", "Isabela N.", "Jéssica T.", "Kelly A."
  ];

  // Date formatting
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Purchase simulator logic
  const triggerNotification = useCallback(() => {
    const randomName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
    setCurrentBuyer(randomName);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const interval = setInterval(triggerNotification, 10000);
    // Initial trigger after 3s
    const timeout = setTimeout(triggerNotification, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [triggerNotification]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePurchase = () => {
    window.open('https://pay.lowify.com.br/checkout?product_id=0MxFI5', '_blank');
  };

  return (
    <div className="min-h-screen bg-nude">
      {/* 0. Top Bar (Countdown & Date) */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-xs md:text-sm sticky top-0 z-50">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
          <span className="font-medium opacity-80 uppercase tracking-widest">{today}</span>
          <div className="flex items-center gap-2">
            <span className="text-rose-gold font-bold">OFERTA EXPIRA EM:</span>
            <span className="bg-rose-gold text-white px-2 py-0.5 rounded font-mono font-bold animate-pulse">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Purchase Notification Popup */}
      <div 
        className={`fixed bottom-24 left-4 md:bottom-8 md:left-8 z-[60] transition-all duration-500 transform ${
          showNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gold/20 flex items-center gap-4 max-w-[280px]">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Check size={20} strokeWidth={3} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Compra confirmada</p>
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">{currentBuyer}</span> acabou de comprar no PIX
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-rose-gold/10 md:hidden transition-transform duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <button 
          onClick={handlePurchase}
          className="w-full bg-rose-gold text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl"
        >
          <ShoppingBag size={20} />
          Garantir Catálogo - R$ 17,90
        </button>
      </div>

      {/* 1. Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-rose-gold/5 to-nude pt-12 pb-16 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left z-10">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold font-bold text-sm rounded-full mb-4 tracking-widest uppercase">
              Oportunidade Única
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight mb-6">
              Catálogo Editável para <span className="text-rose-gold italic">Nail Designers</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Apresente seus serviços com mais profissionalismo, encante suas clientes e feche mais atendimentos hoje mesmo.
            </p>
            <div className="mb-8">
              <p className="text-gray-400 line-through text-lg">De R$ 47,00</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Apenas <span className="text-rose-gold">R$ 17,90</span>
              </h3>
              <p className="text-sm text-gray-500 font-medium tracking-wide">* Pagamento Único • Acesso Imediato</p>
            </div>
            <div className="flex justify-center md:justify-start">
              <CTAButton text="Quero meu catálogo" price="R$ 17,90" onClick={handlePurchase} />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl border border-gold/20 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://i.ibb.co/8LVwVsG2/Chat-GPT-Image-30-de-dez-de-2025-17-38-33.png" 
                alt="Catálogo Editável Nail Designer" 
                className="rounded-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gold/10 hidden md:block w-40 text-center">
                <div className="text-gold flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xs font-bold text-gray-700 uppercase">Campeão de Vendas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Problem Section */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">Você ainda passa por isso?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Muitas profissionais talentosas perdem clientes por falta de uma apresentação visual adequada.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <XCircle className="text-red-400" />, title: "Bagunça no WhatsApp", desc: "Dificuldade em explicar serviços e preços toda vez que alguém chama." },
            { icon: <XCircle className="text-red-400" />, title: "Falta de Imagem Profissional", desc: "Não ter um link ou PDF bonito para mostrar seu portfólio." },
            { icon: <XCircle className="text-red-400" />, title: "Insegurança da Cliente", desc: "A cliente fica na dúvida se seu serviço vale o preço por causa da apresentação." },
            { icon: <XCircle className="text-red-400" />, title: "Perda de Tempo", desc: "Gastar horas tentando criar artes que nunca ficam do jeito que você quer." }
          ].map((item, idx) => (
            <div key={idx} className="bg-nude/30 p-8 rounded-2xl border border-rose-gold/10 hover:shadow-lg transition-shadow">
              <div className="mb-4">{item.icon}</div>
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Solution Section */}
      <Section className="bg-beige-light relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100">
             <path fill="currentColor" d="M10,10 Q90,10 90,90 Q10,90 10,10" />
          </svg>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-bold text-sm tracking-widest uppercase mb-2 block">A Solução Definitiva</span>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 mb-6">Seu Novo Catálogo em <span className="text-rose-gold">Questão de Minutos</span></h2>
            <p className="text-gray-600 mb-8 text-lg">
              Chega de sofrer com design. Criamos um catálogo estratégico, pensado para o nicho de Nail Design, onde você só precisa trocar as fotos e os valores.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "100% Editável no Canva (Grátis ou Pro)",
                "Design elegante e feminino",
                "Ideal para enviar por WhatsApp e Instagram",
                "Você não precisa ser designer"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-rose-gold/10 p-1 rounded-full"><CheckCircle size={20} className="text-rose-gold" /></div>
                  <span className="text-gray-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center md:justify-start">
              <CTAButton text="Quero Meu Acesso Agora" onClick={handlePurchase} />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-rose-gold/5 rounded-[2.5rem] blur-2xl"></div>
            <img 
              src="https://i.ibb.co/xt9Rg2b7/Captura-de-Tela-2025-12-30-a-s-17-53-21.png" 
              className="rounded-3xl shadow-2xl border-4 border-white relative z-10 w-full object-cover" 
              alt="Catálogo Editável em Detalhes" 
            />
          </div>
        </div>
      </Section>

      {/* 4. What you get */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">O que você vai receber:</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Smartphone className="text-gold" />, title: "Design Mobile-First", desc: "Otimizado para ser visto com clareza na tela do celular das suas clientes." },
            { icon: <Edit3 className="text-gold" />, title: "Múltiplas Páginas", desc: "Capa, Sobre Mim, Serviços, Procedimentos, Manutenção e Valores." },
            { icon: <Zap className="text-gold" />, title: "Totalmente Editável", desc: "Altere cores, fontes, fotos e textos para deixá-lo com a cara da sua marca." }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-8 bg-nude/20 rounded-3xl border border-transparent hover:border-gold/30 transition-all">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {item.icon}
              </div>
              <h4 className="font-bold text-xl mb-3">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Benefits Section */}
      <Section className="bg-rose-gold text-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://i.ibb.co/S7vLMV7Q/Chat-GPT-Image-30-de-dez-de-2025-17-42-38.png" 
              className="rounded-3xl shadow-2xl" 
              alt="Profissional Nail Designer" 
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl md:text-5xl mb-8">Por que investir apenas R$ 17,90?</h2>
            <div className="space-y-8">
              {[
                { title: "Mais Profissionalismo", desc: "Deixe de ser 'apenas mais uma' e torne-se uma referência na sua cidade." },
                { title: "Mais Confiança", desc: "Clientes confiam mais em profissionais que cuidam da sua apresentação visual." },
                { title: "Mais Vendas", desc: "Um catálogo bem organizado facilita a decisão da cliente e acelera o fechamento." },
                { title: "Mais Tempo Livre", desc: "Não gaste horas criando nada do zero. Foque no que você faz de melhor: unhas perfeitas." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="text-gold" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{benefit.title}</h4>
                    <p className="text-white/80">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Who is it for */}
      <Section className="bg-white text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12">Para quem é este catálogo?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Nail Designers Iniciantes",
            "Profissionais Experientes",
            "Quem atende em Casa ou Home Care",
            "Donas de Estúdios de Beleza",
            "Especialistas em Alongamento",
            "Manicures Tradicionais"
          ].map((item, i) => (
            <div key={i} className="p-4 bg-nude rounded-xl border border-rose-gold/10 font-medium text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Social Proof */}
      <Section className="bg-nude">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
             {[...Array(5)].map((_, i) => <Star key={i} size={24} className="text-gold" fill="currentColor" />)}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">O que as profissionais estão dizendo</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Ana Paula", text: "Gente, o catálogo é lindo! Em 5 minutos troquei os valores e já mandei pra uma cliente que fechou na hora. Valeu cada centavo!" },
            { name: "Mariana S.", text: "Eu não entendo nada de Canva e consegui editar tudo pelo celular. Ficou muito profissional, as clientes elogiaram muito." },
            { name: "Carla Nail Art", text: "O melhor investimento que fiz esse mês. Prático, barato e muito elegante. Recomendo para todas as manicures." }
          ].map((testimony, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gold/10 relative">
               <span className="absolute -top-4 -left-2 text-6xl text-gold/20 font-serif">"</span>
               <p className="text-gray-600 italic mb-6 relative z-10">{testimony.text}</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-rose-gold/20 flex items-center justify-center font-bold text-rose-gold">
                   {testimony.name[0]}
                 </div>
                 <span className="font-bold text-gray-800">{testimony.name}</span>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Guarantee / Confidence */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto bg-beige-light border-2 border-dashed border-gold/30 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck size={48} className="text-gold mb-4" />
              <h5 className="font-bold mb-2">Compra Segura</h5>
              <p className="text-xs text-gray-500">Seus dados estão 100% protegidos.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock size={48} className="text-gold mb-4" />
              <h5 className="font-bold mb-2">Acesso Imediato</h5>
              <p className="text-xs text-gray-500">Receba o link logo após o pagamento.</p>
            </div>
            <div className="flex flex-col items-center">
              <Edit3 size={48} className="text-gold mb-4" />
              <h5 className="font-bold mb-2">Uso Vitalício</h5>
              <p className="text-xs text-gray-500">Edite quantas vezes quiser, pra sempre.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 9. Final CTA */}
      <Section className="bg-gradient-to-t from-nude to-white relative pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <GoldDivider />
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">Comece a Profissionalizar seu Atendimento Hoje!</h2>
          <p className="text-xl text-gray-600 mb-10">
            Não deixe para amanhã a imagem que você pode ter agora. Por menos que um café com bolo, você transforma sua apresentação.
          </p>
          
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gold/20 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-rose-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Oferta Limitada</span>
            </div>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-2">Pagamento Único</p>
            <div className="flex justify-center items-baseline gap-2 mb-6">
              <span className="text-2xl text-gray-400">R$</span>
              <span className="text-7xl font-bold text-gray-900">17,90</span>
            </div>
            <div className="flex justify-center">
              <CTAButton text="COMPRAR AGORA O CATÁLOGO EDITÁVEL" onClick={handlePurchase} />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 grayscale opacity-50">
               <img src="https://logodownload.org/wp-content/uploads/2014/10/cartao-visa-logo-1.png" className="h-4" alt="Visa" />
               <img src="https://logodownload.org/wp-content/uploads/2014/10/mastercard-logo-2.png" className="h-4" alt="Mastercard" />
               <img src="https://logodownload.org/wp-content/uploads/2017/11/pix-logo-1.png" className="h-4" alt="Pix" />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 text-center">
        <p className="font-serif text-2xl text-rose-gold mb-6 italic">Catálogo Pro Nail</p>
        <div className="flex justify-center gap-6 mb-8 text-gray-400">
          <Instagram size={20} className="hover:text-rose-gold cursor-pointer transition-colors" />
        </div>
        <p className="text-sm text-gray-400">© 2024 Todos os direitos reservados. Este produto não é afiliado ao Canva.</p>
        <div className="mt-4 flex justify-center gap-4 text-[10px] text-gray-300 uppercase tracking-widest">
           <a href="#" className="hover:text-gray-500">Termos de Uso</a>
           <a href="#" className="hover:text-gray-500">Políticas de Privacidade</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
