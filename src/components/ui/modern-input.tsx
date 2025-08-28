import React from 'react';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'neon';
}

const variantStyles = {
  default: 'bg-background border border-input',
  glass: 'bg-background/20 backdrop-blur-lg border border-white/20',
  neon: 'bg-background/10 border border-purple-500/30 focus:border-purple-500/60'
};

export const ModernInput: React.FC<ModernInputProps> = ({
  className,
  variant = 'default',
  type,
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};