import type { ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { ArrowDown, ArrowUp, ChevronRight, Leaf } from 'lucide-react';

export interface CardMetricProps {
    title?: string;
    subtitle?: string;
    value: number;
    unit: string;
    icon?: ComponentType<{ className?: string }>;
    subValue?: number;
    subUnit?: string;
    positiveData?: boolean;
    date?: Date;
    showChevron?: boolean;
    className?: string;
}

export const CardMetric = ({
    title,
    subtitle,
    value,
    unit,
    icon: Icon = Leaf,
    subValue,
    subUnit,
    positiveData,
    date,
    showChevron = false,
    className,
    ...props
}: CardMetricProps) => {
    const hasTrend = subValue !== undefined;
    const isTrendingUp = hasTrend ? subValue > 0 : false;
    const isPositiveOutcome = positiveData !== undefined
        ? (positiveData ? isTrendingUp : !isTrendingUp)
        : isTrendingUp;

    const trendColorClass = isPositiveOutcome ? 'text-green-500' : 'text-red-500';

    return (
        <div
            className={cn(
                "relative flex flex-row items-center gap-3 sm:gap-3 md:gap-4 p-3 border border-slate-100 rounded-xl shadow-sm w-full min-w-[160px] font-sans max-h-[105px]",
                showChevron && "pr-8",
                className
            )}
            {...props}
        >
            <div className="flex h-full">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                </div>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-medium text-slate-500 truncate">{title}</span>
                <div className="flex gap-1.5 items-baseline">
                    <span className="text-xl font-bold text-slate-800 tracking-tight">
                        {(value !== undefined && value !== null)
                            ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 1 })
                            : '-'}
                    </span>
                    {unit && <span className="text-[11px] font-light text-slate-500">{unit}</span>}
                </div>
                {(hasTrend || subUnit) && (
                    <div className="flex whitespace-nowrap items-center gap-1.5 sm:gap-2 text-xs">
                        {hasTrend && (
                            <span className={trendColorClass}>
                                {isTrendingUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                            </span>
                        )}
                        <p className={cn("font-semibold", hasTrend ? cn("-ml-2", trendColorClass) : "text-slate-500")}>
                            {hasTrend ? `${subValue} ` : ''}{subUnit}
                        </p>
                    </div>
                )}
                {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
            </div>

            {showChevron && (
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 shrink-0" />
            )}
        </div>
    );
};