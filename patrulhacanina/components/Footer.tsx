
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-50 grayscale">
          <div className="w-8 h-8 bg-pawRed rounded-full flex items-center justify-center border-2 border-pawYellow">
            <span className="text-lg">🐾</span>
          </div>
          <h1 className="text-white font-title text-lg tracking-wide uppercase">
            Mega<span className="text-pawYellow">Moldes</span> Kids
          </h1>
        </div>
        <p className="mb-6">© 2025 MegaMoldes Kids. Todos os direitos reservados.<br/>Material Digital para uso recreativo.</p>
        <div className="flex justify-center gap-6 text-sm mb-8">
          <a href="#" className="hover:text-white underline">Termos</a>
          <a href="#" className="hover:text-white underline">Privacidade</a>
          <a href="#" className="hover:text-white underline">Suporte</a>
        </div>
        <div className="text-[10px] max-w-2xl mx-auto opacity-30 leading-tight uppercase">
            Aviso: Este pack contém artes inspiradas em diversos personagens. Todas as marcas mencionadas são propriedades de seus respectivos donos.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
