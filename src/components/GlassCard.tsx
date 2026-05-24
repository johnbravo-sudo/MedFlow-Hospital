import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
  key?: React.Key | any;
}

export function GlassCard({ children, className = '', onClick, id, ...props }: GlassCardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        bg-white/15 backdrop-blur-xl 
        border border-white/20 
        rounded-2xl shadow-xl 
        hover:border-[#8ade4f]/80 
        hover:bg-white/20
        hover:shadow-2xl hover:shadow-[#8ade4f]/15
        hover:-translate-y-1 
        transition-all duration-300 
        ${onClick ? 'cursor-pointer animate-scale-up' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
