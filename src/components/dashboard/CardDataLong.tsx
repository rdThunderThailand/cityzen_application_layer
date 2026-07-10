import { cn } from '../../utils/cn';
import { ChevronRight, CloudRain } from 'lucide-react';
import { getSparklinePoints, type CardMetricWLineChartProps } from './CardMetricWLineChart';

export interface CardDataLongItemProps extends Omit<CardMetricWLineChartProps, 'className'> {
    trendLabel?: string;
}

export interface CardDataLongProps {
    heading: string;
    allDataHref?: string;
    items: CardDataLongItemProps[];
    className?: string;
    maxItems?: number;
}

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 40;

const getTrendColorClass = (percentage: number, positiveData: boolean) => {
    const isTrendingUp = percentage > 0;
    const isPositiveOutcome = positiveData ? isTrendingUp : !isTrendingUp;

    return isPositiveOutcome ? 'text-emerald-500' : 'text-rose-500';
};

const CardDataLongItem = ({ item }: { item: CardDataLongItemProps }) => {
    const Icon = item.icon ?? CloudRain;
    const accentColorClass = item.chartColorClass ?? 'text-blue-500';
    const trendColorClass = getTrendColorClass(item.percentage, item.positiveData);
    const signedPercentage = `${item.percentage > 0 ? '+' : ''}${item.percentage}%`;

    const points = item.chartData.length >= 2 ? getSparklinePoints(item.chartData) : null;
    const polylinePoints = points?.map((point) => `${point.x},${point.y}`).join(' ');

    return (
        <div className="flex flex-col min-w-0 gap-1 lg:border-l lg:border-slate-100 lg:pl-4 lg:first:border-l-0 lg:first:pl-0">
            <div className="flex items-center gap-2 min-w-0">
                <Icon className={cn("w-5 h-5 shrink-0", accentColorClass)} />
                <span className="text-sm font-medium text-slate-500 truncate">{item.title}</span>
            </div>

            <span className="text-lg font-bold text-slate-900 tracking-tight truncate">
                {item.valueLabel} {item.valueText}
            </span>

            <span className="text-xs text-slate-400 truncate">{item.subLabel}</span>

            <div className="flex items-center gap-1 text-xs min-w-0">
                <span className="text-slate-400 truncate">{item.trendLabel ?? 'จากเมื่อวาน'}</span>
                <span className={cn("font-semibold whitespace-nowrap shrink-0", trendColorClass)}>
                    {signedPercentage}
                </span>
            </div>

            <div className="flex-1" />

            <div className="-mx-1">
                {points ? (
                    <svg
                        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                        preserveAspectRatio="none"
                        className={cn("w-full h-[56px]", accentColorClass)}
                    >
                        <polyline
                            points={polylinePoints}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <div className="w-full h-[56px]" />
                )}
            </div>
        </div>
    );
};

export const CardDataLong = ({
    heading,
    allDataHref = "#",
    items = [],
    className,
    maxItems,
    ...props
}: CardDataLongProps) => {
    const visibleItems = items.slice(0, maxItems);

    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 border border-slate-100 rounded-xl shadow-sm w-full font-sans bg-white",
                className
            )}
            {...props}
        >
            {/* Header section */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                <h3 className="text-sm font-semibold text-slate-800 truncate">{heading}</h3>
                <a
                    href={allDataHref}
                    className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                >
                    ดูทั้งหมด
                    <ChevronRight className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* Item row section - แถวยาวแบ่งด้วยเส้นคั่น แทนการ์ดแยกแต่ละใบ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
                {visibleItems.map((item, index) => (
                    <CardDataLongItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CardDataLong;
