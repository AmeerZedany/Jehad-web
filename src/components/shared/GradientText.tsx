import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

const GradientText = ({ 
  children, 
  className = '', 
  gradient = 'from-yellow-400 via-yellow-300 to-amber-200' 
}: GradientTextProps) => {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} ${className}`}>
      {children}
    </span>
  );
};

export default GradientText; 