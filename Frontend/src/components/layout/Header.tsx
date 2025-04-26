import React, { useState, useEffect } from 'react';
import { Menu, X, Building } from 'lucide-react';

interface HeaderProps {
  setCurrentPage: (page: 'landing' | 'dashboard') => void;
  currentPage: 'landing' | 'dashboard';
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: 'landing' | 'dashboard') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled || currentPage === 'dashboard'
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigateTo('landing')}
              className="flex items-center space-x-2 text-white hover:text-blue-400 transition duration-200"
            >
              <Building size={28} className="text-blue-500" />
              <span className="text-xl font-bold">PropertyAI</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateTo('landing')}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === 'landing' ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === 'dashboard' ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => navigateTo('landing')}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentPage === 'landing'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                currentPage === 'dashboard'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;