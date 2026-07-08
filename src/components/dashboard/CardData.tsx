import type { ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { ChevronRight, Box } from 'lucide-react';

export type CardDataStatusKey =
    | 'increasing'
    | 'decreasing'
    | 'stable'
    | 'critical'
    | 'high_warning'
    | 'warning';

export interface CardDataItemProps {
    title: string;
    subtitle?: string;
    icon?: ComponentType<{ className?: string }>;
    status?: CardDataStatusKey;
}

export interface CardDataProps {
    heading: string;
    allDataHref?: string;
    items: CardDataItemProps[];
    className?: string;
}

const statusConfig: Record<CardDataStatusKey, { label: string; badgeClass: string; dotClass: string }> = {
    increasing: { label: 'เพิ่มขึ้น', badgeClass: 'bg-rose-50 text-rose-600', dotClass: 'bg-rose-500' },
    decreasing: { label: 'ลดลง', badgeClass: 'bg-emerald-50 text-emerald-600', dotClass: 'bg-emerald-500' },
    stable: { label: 'คงที่', badgeClass: 'bg-sky-50 text-sky-600', dotClass: 'bg-sky-500' },
    critical: { label: 'วิกฤต', badgeClass: 'bg-rose-50 text-rose-600', dotClass: 'bg-rose-500' },
    high_warning: { label: 'เฝ้าระวังสูง', badgeClass: 'bg-amber-50 text-amber-600', dotClass: 'bg-amber-500' },
    warning: { label: 'เฝ้าระวัง', badgeClass: 'bg-amber-50 text-amber-500', dotClass: 'bg-amber-400' },
};

export const CardData = ({
    heading,
    allDataHref = "#",
    items = [],
    className,
    ...props
}: CardDataProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 border border-slate-100 rounded-xl shadow-sm w-full max-w-[360px] font-sans bg-white",
                className
            )}
            {...props}
        >
            {/* Header section */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                <h3 className="text-sm font-semibold text-slate-800 truncate">{heading}</h3>
                <a
                    href={allDataHref}
                    className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-150 shrink-0"
                >
                    ดูทั้งหมด
                    <ChevronRight className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* List items section - ตรงนี้คือจุดที่ Map ข้อมูลออกมา */}
            <div className="flex flex-col gap-3">
                {items.map((item, index) => {
                    const IconComponent = item.icon || Box; // ป้องกันกรณีไม่มี icon ส่งมา
                    return (
                        <div key={index} className="flex items-center justify-between gap-3 py-1">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-9 h-9 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-slate-800 truncate">{item.title}</span>
                                    {item.subtitle && (
                                        <span className="text-xs text-slate-400 truncate">{item.subtitle}</span>
                                    )}
                                </div>
                            </div>

                            {item.status && statusConfig[item.status] && (
                                <span
                                    className={cn(
                                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0",
                                        statusConfig[item.status].badgeClass
                                    )}
                                >
                                    {statusConfig[item.status].label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardData;
