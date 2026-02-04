import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StrandCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  strand: 'explore' | 'exploit' | 'explain';
  delay?: number;
  className?: string;
}

export const StrandCard: React.FC<StrandCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  strand,
  delay = 0,
  className,
}) => {
  const strandColors = {
    explore: {
      bg: 'bg-exp3-cyan/10',
      border: 'border-exp3-cyan/30',
      text: 'text-exp3-cyan',
      glow: 'hover:shadow-[0_0_30px_hsl(187,100%,50%,0.2)]',
      accent: 'from-exp3-cyan/20 to-transparent',
    },
    exploit: {
      bg: 'bg-exp3-orange/10',
      border: 'border-exp3-orange/30',
      text: 'text-exp3-orange',
      glow: 'hover:shadow-[0_0_30px_hsl(17,100%,60%,0.2)]',
      accent: 'from-exp3-orange/20 to-transparent',
    },
    explain: {
      bg: 'bg-exp3-emerald/10',
      border: 'border-exp3-emerald/30',
      text: 'text-exp3-emerald',
      glow: 'hover:shadow-[0_0_30px_hsl(162,100%,39%,0.2)]',
      accent: 'from-exp3-emerald/20 to-transparent',
    },
  };

  const colors = strandColors[strand];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        'group relative rounded-2xl border bg-card/50 backdrop-blur-sm p-8 transition-all duration-500',
        colors.border,
        colors.glow,
        'hover:-translate-y-2',
        className
      )}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r',
          colors.accent
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
          colors.bg
        )}
      >
        <span className={cn('w-7 h-7', colors.text)}>{icon}</span>
      </div>

      {/* Content */}
      <h3 className={cn('text-xl font-bold mb-1', colors.text)}>{title}</h3>
      <p className="text-sm font-medium text-muted-foreground mb-4">{subtitle}</p>
      <p className="text-muted-foreground leading-relaxed">{description}</p>

      {/* Hover indicator */}
      <div
        className={cn(
          'absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
          colors.bg
        )}
      >
        <svg
          className={cn('w-4 h-4', colors.text)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default StrandCard;
