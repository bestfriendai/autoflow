import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neon' | 'automotive' | 'apparel';
  hover?: boolean;
}

const variantStyles = {
  default: 'bg-background border border-border',
  glass: 'bg-background/20 backdrop-blur-lg border border-white/10',
  neon: 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 border border-purple-500/30',
  automotive: 'bg-gradient-to-br from-gray-900/90 to-blue-900/20 border border-blue-500/30',
  apparel: 'bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-indigo-900/20 border border-pink-500/30'
};

export const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}) => {
  const baseClasses = 'rounded-xl overflow-hidden relative';
  const variantClasses = variantStyles[variant];
  
  return (
    <motion.div
      className={cn(baseClasses, variantClasses, className)}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};