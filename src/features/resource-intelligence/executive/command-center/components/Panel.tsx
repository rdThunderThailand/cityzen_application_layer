'use client';
import React from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Panel({ title, subtitle, children, className = '', noPadding = false }: PanelProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-[10px] rounded-2xl shadow-md ${noPadding ? '' : 'p-5'} ${className}`}>
      {title && (
        <div className={noPadding ? 'pt-5 px-6' : undefined}>
          <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mb-4">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
