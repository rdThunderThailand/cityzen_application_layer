import type { ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { ArrowDown, ArrowUp, Leaf } from 'lucide-react';

export interface CardMetricProps {
    title: string;
    value: number;
    unit: string;
    icon?: ComponentType<{ className?: string }>;
    subValue: number;
    subUnit?: string;
    positiveData: boolean;
    date?: Date;
    className?: string;
}

export const CardMetric = ({
    title,
    value,
    unit,
    icon: Icon = Leaf,
    subValue,
    subUnit,
    positiveData,
    date,
    className,
    ...props
}: CardMetricProps) => {
    const isTrendingUp = subValue > 0;
    const isPositiveOutcome = positiveData ? isTrendingUp : !isTrendingUp;

    const trendColorClass = isPositiveOutcome ? 'text-green-500' : 'text-red-500';

    return (
        <div
            className={cn(
                "flex flex-row items-center gap-3 sm:gap-3 md:gap-4 p-3 border border-slate-100 rounded-xl shadow-sm w-full min-w-[160px] font-sans max-h-[105px]",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                <Icon className="w-4.5 h-4.5" />
            </div>

            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-medium text-slate-500 truncate">{title}</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-800 tracking-tight">
                        {(value !== undefined && value !== null)
                            ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 1 })
                            : '-'}
                    </span>
                    {unit && <span className="text-[11px] font-light text-slate-500">{unit}</span>}
                </div>
                <div className="flex whitespace-nowrap items-center gap-1.5 sm:gap-2 text-xs">
                    <span className={trendColorClass}>
                        {isTrendingUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    </span>
                    <p className={cn("font-semibold -ml-2", trendColorClass)}>{subValue} {subUnit}</p>
                </div>
            </div>
        </div>
    );
};