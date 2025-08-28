import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'dots' | 'grid' | 'waves';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const variantStyles = {
  gradient: 'bg-gradient-to-br from-background via-background/95 to-accent/20',
  dots: 'bg-background bg-[radial-gradient(theme(colors.foreground/0.1)_1px,transparent_1px)] bg-[size:20px_20px]',
  grid: 'bg-background bg-[linear-gradient(theme(colors.foreground/0.1)_1px,transparent_1px),linear-gradient(90deg,theme(colors.foreground/0.1)_1px,transparent_1px)] bg-[size:20px_20px]',
  waves: 'bg-gradient-to-r from-background via-accent/10 to-background'
};

const intensityStyles = {
  low: 'opacity-50',
  medium: 'opacity-75',
  high: 'opacity-100'
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'gradient',
  intensity = 'medium',
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        'min-h-screen relative',
        variantStyles[variant],
        intensityStyles[intensity],
        className
      )}
    >
      {variant === 'waves' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};