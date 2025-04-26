import React, { useEffect, useRef } from 'react';
import { ChevronRight, Building } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0);
      const transform = `translateY(${scrollY * 0.3}px)`;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = transform;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      
      <div 
        ref={heroRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40 text-center"
      >
        <div className="inline-flex items-center justify-center px-4 py-2 mb-4 sm:mb-6 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/30">
          <Building size={16} className="mr-2 text-blue-400" />
          <span className="text-sm font-medium text-blue-200">Intelligent Real Estate Analysis</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6">
          <span className="block">Predict Real Estate</span>
          <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent glow-text">
            Investment Success
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-xl text-slate-300 mb-10">
          Harness the power of AI and data analytics to make smarter property investments and maximize your returns.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
          <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-200 bg-transparent border border-blue-500 rounded-md hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;