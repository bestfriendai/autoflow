import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glass' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs' | 'md';
  shimmer?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  glass: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20',
  gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
};

const sizeStyles = {
  default: 'h-10 px-4 py-2',
  xs: 'h-7 px-2 text-xs',
  sm: 'h-9 rounded-md px-3',
  md: 'h-10 px-6 py-2',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  shimmer = false,
  glow = false,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  return (
    <motion.button
      className={cn(
        baseClasses,
        variantStyles[variant],
        sizeStyles[size],
        {
          'animate-shimmer bg-gradient-to-r bg-[length:200%_100%]': shimmer,
          'shadow-glow-purple': glow && variant === 'gradient'
        },
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};