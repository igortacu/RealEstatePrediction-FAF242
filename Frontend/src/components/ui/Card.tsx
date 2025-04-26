import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      relative
      bg-slate-800/60 
      backdrop-blur-sm 
      rounded-xl 
      border 
      border-slate-700/50 
      shadow-lg 
      overflow-hidden
      transition-all
      duration-300
      hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]
      hover:border-blue-500/50
      hover:scale-[1.02]
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};