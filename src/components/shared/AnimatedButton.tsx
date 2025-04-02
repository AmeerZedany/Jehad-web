import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}

const AnimatedButton = ({
  href,
  children,
  className = '',
  variant = 'primary',
  external = false
}: AnimatedButtonProps) => {
  const baseStyles = "group px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:-translate-y-1";
  const variantStyles = {
    primary: "bg-gradient-to-r from-yellow-500 to-amber-400 text-gray-900 shadow-lg hover:shadow-2xl",
    secondary: "bg-white/5 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:shadow-2xl hover:bg-white/10"
  };

  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default AnimatedButton; 