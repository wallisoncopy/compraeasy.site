import React from 'react';
import { LockClosedIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="font-heading font-bold text-white text-xl mb-4">App Pack Nutri 300</p>
        <p className="mb-8 text-sm max-w-md mx-auto">
            Facilitando a vida de nutricionistas em todo o Brasil com ferramentas práticas e design de alta qualidade.
        </p>
        
        <div className="flex justify-center items-center gap-2 mb-8 text-green-500 font-medium">
             <LockClosedIcon className="w-4 h-4" />
             <span>Compra 100% segura e protegida</span>
        </div>

        <div className="text-xs text-gray-600 border-t border-gray-800 pt-8">
          <p>&copy; {new Date().getFullYear()} App Pack Nutri 300. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;