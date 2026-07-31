import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import React from "react";

export interface TrendData {
  value: string;
  isPositive: boolean;
  label?: string;
}

interface TechnicianMetricCardProps {
  title: string;
  value: string | number | React.ReactNode;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: TrendData;
  actionLabel?: string;
  onActionClick?: () => void;
  customFooter?: React.ReactNode;
  className?: string;
}

export function TechnicianMetricCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  trend,
  actionLabel,
  onActionClick,
  customFooter,
  className = "",
}: TechnicianMetricCardProps) {
  return (
    <div className={`bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden ${className}`}>
      <div className="flex items-start gap-4 mb-2">
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center shrink-0`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <span className="text-[12px] font-bold text-slate-600 mb-0.5">{title}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{value}</span>
          </div>
          {subtitle && (
            <span className="text-[11px] font-medium text-slate-500 mt-1">{subtitle}</span>
          )}
        </div>
      </div>
      
      {(trend || actionLabel || customFooter) && (
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          {customFooter ? (
            customFooter
          ) : trend ? (
            <>
              {trend.label ? (
                <span className="text-[11px] font-medium text-slate-500">{trend.label}</span>
              ) : (
                <span />
              )}
              <div className={`flex items-center gap-1 ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                <span className="text-[11px] font-bold">{trend.value}</span>
              </div>
            </>
          ) : actionLabel && onActionClick ? (
            <div className="w-full flex justify-end">
              <button onClick={onActionClick} className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                {actionLabel} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
