import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export type TrendSentimentKey = 'positive' | 'negative' | 'neutral';

export interface TrendItemProps {
    label: string;
    value: string;
    direction: 'up' | 'down';
    sentiment: TrendSentimentKey;
    showPlus?: boolean;
}

export interface CardTrendProps {
    title: string;
    items: TrendItemProps[];
    className?: string;
}

const sentimentConfig: Record<TrendSentimentKey, string> = {
    positive: 'text-emerald-500',
    negative: 'text-rose-500',
    neutral: 'text-slate-400',
};

const TrendRow = ({ item }: { item: TrendItemProps }) => {
    const colorClass = sentimentConfig[item.sentiment];
    const DirectionIcon = item.direction === 'up' ? ArrowUp : ArrowDown;

    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-slate-600 truncate">{item.label}</span>
            <span className={cn("flex items-center gap-0.5 text-sm font-semibold shrink-0", colorClass)}>
                {item.direction === 'up' && item.showPlus ? (
                    '+'
                ) : (
                    <DirectionIcon className="w-3.5 h-3.5" />
                )}
                {item.value}
            </span>
        </div>
    );
};

export const CardTrend = ({
    title,
    items = [],
    className,
    ...props
}: CardTrendProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-2.5 p-4 bg-white border border-slate-100 rounded-xl shadow-sm",
                className
            )}
            {...props}
        >
            <span className="text-sm font-semibold text-slate-800">{title}</span>
            <div className="leading-1">
                {items.map((item, index) => (
                    <TrendRow key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CardTrend;
