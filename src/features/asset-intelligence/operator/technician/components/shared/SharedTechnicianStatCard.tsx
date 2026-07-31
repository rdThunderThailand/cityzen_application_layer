"use client";

import { LucideIcon } from "lucide-react";

export type StatCardColorScheme = "blue" | "orange" | "purple" | "emerald" | "rose" | "slate" | "amber";

interface SharedTechnicianStatCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  subtitle?: string;
  icon: LucideIcon;
  colorScheme: StatCardColorScheme;
  onClick?: () => void;
  actionLabel?: string;
  layout?: "centered" | "left";
}

const colorMap = {
  blue: {
    bg: "bg-[#F8FAFF]",
    hoverBorder: "hover:border-blue-100",
    iconBg: "bg-blue-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(37,99,235,0.15)]",
    iconText: "text-blue-600",
  },
  orange: {
    bg: "bg-[#FFFDF8]",
    hoverBorder: "hover:border-orange-100",
    iconBg: "bg-orange-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    iconText: "text-orange-500",
  },
  purple: {
    bg: "bg-[#FCF9FF]",
    hoverBorder: "hover:border-purple-100",
    iconBg: "bg-purple-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    iconText: "text-purple-600",
  },
  emerald: {
    bg: "bg-[#F6FDF9]",
    hoverBorder: "hover:border-emerald-100",
    iconBg: "bg-emerald-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    iconText: "text-emerald-600",
  },
  rose: {
    bg: "bg-[#FFF9FA]",
    hoverBorder: "hover:border-rose-100",
    iconBg: "bg-rose-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    iconText: "text-rose-500",
  },
  slate: {
    bg: "bg-[#F8FAFC]",
    hoverBorder: "hover:border-slate-200",
    iconBg: "bg-slate-200/60",
    iconShadow: "shadow-[0_0_15px_rgba(148,163,184,0.15)]",
    iconText: "text-slate-500",
  },
  amber: {
    bg: "bg-amber-50/50",
    hoverBorder: "hover:border-amber-100",
    iconBg: "bg-amber-100/60",
    iconShadow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    iconText: "text-amber-600",
  },
};

export function SharedTechnicianStatCard({
  title,
  value,
  suffix,
  subtitle,
  icon: Icon,
  colorScheme,
  onClick,
  actionLabel,
  layout = "centered",
}: SharedTechnicianStatCardProps) {
  const styles = colorMap[colorScheme] || colorMap.slate;

  if (layout === "left") {
    return (
      <div
        onClick={onClick}
        className={`${styles.bg} rounded-2xl p-5 border border-transparent ${styles.hoverBorder} flex flex-col justify-between relative overflow-hidden transition-colors ${onClick ? "cursor-pointer group" : ""}`}
      >
        <div className="flex items-start gap-4 relative z-10">
          <div
            className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0 ${styles.iconShadow} ${onClick ? "group-hover:scale-105 transition-transform" : ""}`}
          >
            <Icon className={`w-6 h-6 ${styles.iconText}`} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-600 mb-1">{title}</p>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-bold ${styles.iconText} leading-none`}>{value}</span>
              {suffix && <span className="text-[12px] font-bold text-slate-600 mb-1">{suffix}</span>}
            </div>
            {subtitle && <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {actionLabel && (
          <div className={`mt-4 pt-4 border-t ${colorScheme === 'slate' ? 'border-slate-200' : 'border-' + colorScheme + '-100'} relative z-10`}>
            <button className={`text-[11px] font-bold ${styles.iconText} flex items-center gap-1 hover:gap-2 transition-all`}>
              {actionLabel} <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${styles.bg} rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent ${styles.hoverBorder} transition-colors ${onClick ? "cursor-pointer group" : ""}`}
    >
      <div
        className={`w-[46px] h-[46px] rounded-full ${styles.iconBg} flex items-center justify-center shrink-0 ${styles.iconShadow} ${onClick ? "group-hover:scale-105 transition-transform" : ""}`}
      >
        <Icon className={`w-[22px] h-[22px] ${styles.iconText}`} />
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-[12px] font-bold text-[#1E293B] mb-0.5 text-center">
          {title}
        </span>
        <div className="flex items-end gap-1">
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">
            {value}
          </span>
          {suffix && (
            <span className="text-[12px] font-bold text-slate-600 mb-1">
              {suffix}
            </span>
          )}
        </div>
        {subtitle && (
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 mb-1 text-center">
            {subtitle}
          </span>
        )}
        {actionLabel && (
          <span className="text-[11px] font-bold text-blue-600 mt-0.5 flex items-center gap-1 group-hover:underline">
            {actionLabel}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        )}
      </div>
    </div>
  );
}
