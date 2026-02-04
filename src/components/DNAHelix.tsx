import React from 'react';
import { motion } from 'framer-motion';

interface DNAHelixProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DNAHelix: React.FC<DNAHelixProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: { width: 120, height: 200 },
    md: { width: 200, height: 400 },
    lg: { width: 300, height: 600 },
  };

  const { width, height } = sizeMap[size];
  const numPairs = size === 'sm' ? 8 : size === 'md' ? 12 : 16;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ transform: 'perspective(800px) rotateY(15deg)' }}
      >
        <defs>
          {/* Gradients for strands */}
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(200, 100%, 60%)" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(17, 100%, 60%)" />
            <stop offset="100%" stopColor="hsl(30, 100%, 70%)" />
          </linearGradient>
          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(162, 100%, 39%)" />
            <stop offset="100%" stopColor="hsl(162, 100%, 50%)" />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowEmerald" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Generate helix pairs */}
        {Array.from({ length: numPairs }).map((_, i) => {
          const y = (height / (numPairs + 1)) * (i + 1);
          const phase = (i / numPairs) * Math.PI * 4;
          const amplitude = width * 0.35;
          const centerX = width / 2;
          
          // Calculate positions for three strands (120° apart)
          const x1 = centerX + Math.sin(phase) * amplitude;
          const x2 = centerX + Math.sin(phase + (2 * Math.PI / 3)) * amplitude;
          const x3 = centerX + Math.sin(phase + (4 * Math.PI / 3)) * amplitude;
          
          const depth1 = Math.cos(phase);
          const depth2 = Math.cos(phase + (2 * Math.PI / 3));
          const depth3 = Math.cos(phase + (4 * Math.PI / 3));

          return (
            <g key={i}>
              {/* Connection lines between nodes */}
              {i > 0 && (
                <>
                  <motion.line
                    x1={centerX + Math.sin(((i - 1) / numPairs) * Math.PI * 4) * amplitude}
                    y1={(height / (numPairs + 1)) * i}
                    x2={x1}
                    y2={y}
                    stroke="url(#cyanGradient)"
                    strokeWidth={2}
                    opacity={0.6}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                  <motion.line
                    x1={centerX + Math.sin(((i - 1) / numPairs) * Math.PI * 4 + (2 * Math.PI / 3)) * amplitude}
                    y1={(height / (numPairs + 1)) * i}
                    x2={x2}
                    y2={y}
                    stroke="url(#orangeGradient)"
                    strokeWidth={2}
                    opacity={0.6}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.05 + 0.1 }}
                  />
                  <motion.line
                    x1={centerX + Math.sin(((i - 1) / numPairs) * Math.PI * 4 + (4 * Math.PI / 3)) * amplitude}
                    y1={(height / (numPairs + 1)) * i}
                    x2={x3}
                    y2={y}
                    stroke="url(#emeraldGradient)"
                    strokeWidth={2}
                    opacity={0.6}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.05 + 0.2 }}
                  />
                </>
              )}
              
              {/* Nodes - sorted by depth for proper layering */}
              {[
                { x: x1, depth: depth1, color: 'cyan', gradient: 'url(#cyanGradient)', filter: 'url(#glowCyan)' },
                { x: x2, depth: depth2, color: 'orange', gradient: 'url(#orangeGradient)', filter: 'url(#glowOrange)' },
                { x: x3, depth: depth3, color: 'emerald', gradient: 'url(#emeraldGradient)', filter: 'url(#glowEmerald)' },
              ]
                .sort((a, b) => a.depth - b.depth)
                .map((node, j) => (
                  <motion.circle
                    key={j}
                    cx={node.x}
                    cy={y}
                    r={6 + node.depth * 2}
                    fill={node.gradient}
                    filter={node.filter}
                    opacity={0.7 + node.depth * 0.3}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.7 + node.depth * 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08 + j * 0.05,
                      ease: 'easeOut',
                    }}
                  />
                ))}
            </g>
          );
        })}
      </svg>
      
      {/* Animated glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-exp3-cyan/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-exp3-orange/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-2/3 w-28 h-28 bg-exp3-emerald/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default DNAHelix;
