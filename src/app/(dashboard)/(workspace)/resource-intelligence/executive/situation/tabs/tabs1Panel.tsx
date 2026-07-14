import CardData from "@/components/dashboard/CardData";
import CardWMap from "@/components/dashboard/CardWMap";
import { cardEventData } from "../../../../../../../../migration/executive/daily-brief/seed_event_data";
import { cardTaskData } from "../../../../../../../../migration/executive/daily-brief/seed_task_data";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { situationMetricsData } from "../../../../../../../../migration/executive/situation/seed_overview";
import { cn } from "@/utils/cn";
import {
    AlertTriangle,
    Truck,
    Activity,
    TrendingUp,
    ShieldCheck,
    Leaf,
    ChevronRight
} from "lucide-react";
import { forecastTrendCardData } from "../../../../../../../../migration/executive/situation/seed_forecast";
import { watchListCardData } from "../../../../../../../../migration/executive/situation/seed_watchlist";
import CardDataHorizontal from "@/components/dashboard/cardDataHorizontal";
import CardDataMedia from "@/components/dashboard/cardDataMedia";
import { cctvMediaData } from "../../../../../../../../migration/executive/situation/seed_cctvMediaData";
import { metricSourceData } from "../../../../../../../../migration/executive/situation/seed_metricSourceData";

const categoryMetrics = [
    {
        icon: AlertTriangle,
        iconColor: "text-red-500",
        title: "ภัยธรรมชาติ",
        value: "2 เหตุการณ์",
        footnote: (
            <>
                วิกฤต <span className="text-red-500 font-semibold">1</span> | เฝ้าระวัง 1
            </>
        )
    },
    {
        icon: Truck,
        iconColor: "text-orange-500",
        title: "อุบัติเหตุและสาธารณภัย",
        value: "4 เหตุการณ์",
        footnote: "วิกฤต 0 | เฝ้าระวัง 4"
    },
    {
        icon: Activity,
        iconColor: "text-purple-500",
        title: "สาธารณสุข",
        value: "3 เหตุการณ์",
        footnote: "วิกฤต 0 | เฝ้าระวัง 3"
    },
    {
        icon: TrendingUp,
        iconColor: "text-blue-500",
        title: "เศรษฐกิจและสังคม",
        value: "5 เหตุการณ์",
        footnote: "วิกฤต 0 | เฝ้าระวัง 5"
    },
    {
        icon: ShieldCheck,
        iconColor: "text-emerald-500",
        title: "ความมั่นคง",
        value: "2 เหตุการณ์",
        footnote: "วิกฤต 0 | เฝ้าระวัง 2"
    },
    {
        icon: Leaf,
        iconColor: "text-green-500",
        title: "สิ่งแวดล้อม",
        value: "4 เหตุการณ์",
        footnote: "วิกฤต 0 | เฝ้าระวัง 4"
    }
];

export function Tabs1Panel() {
    return (
        <div className="w-full h-full flex flex-col min-h-0 pb-2">

            {/* Main content area */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
                {/* Left Area (Map + Accent Card + Category Summary Card) */}
                <div className="flex-1 min-w-0 flex flex-col min-h-0 overflow-hidden">
                    {/* metrics row */}
                    <div className="flex gap-4 mb-4 shrink-0">
                        {situationMetricsData.map((item, index) => (
                            <CardMetric key={index} {...item} showChevron className="bg-white hover:shadow-md transition-shadow duration-200" />
                        ))}
                    </div>
                    {/* Top part: Map + Accent CardData */}
                    <div className="flex gap-4 flex-1 min-h-0">
                        <CardWMap className="flex-1 min-w-0 max-w-none h-full" />
                        <CardData variant="accent" heading={cardEventData.heading} items={cardEventData.items} className="w-[400px] shrink-0 h-full" maxItems={4} />
                    </div>

                    {/* Bottom part: Horizontal Category Summary Card */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm w-full font-sans bg-white mt-4 shrink-0">
                        {/* Header Row */}
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                            <span className="text-slate-900 font-bold text-sm">สถานการณ์รายหมวด</span>
                            <a href="#" className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                <span>ดูทั้งหมด</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Content Row Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-6">
                            {categoryMetrics.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center text-center px-2 py-4 border-slate-100 border-r-0 odd:border-r md:border-r md:last:border-r-0"
                                    >
                                        <IconComponent className={cn("w-5 h-5", item.iconColor)} />
                                        <span className="text-slate-800 font-bold text-xs mt-2">{item.title}</span>
                                        <span className="text-slate-900 font-bold text-sm mt-1">{item.value}</span>
                                        <span className="text-[10px] text-slate-400 mt-1 select-none font-medium">{item.footnote}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-[440px] shrink-0 flex flex-col gap-2 h-full min-h-0">
                    <CardData
                        variant={forecastTrendCardData.variant}
                        heading={forecastTrendCardData.heading}
                        items={forecastTrendCardData.items}
                        maxItems={5}
                        className="shrink-0 p-2 gap-2 [&>div:last-child]:gap-1"
                    />
                    <CardData
                        variant={watchListCardData.variant}
                        heading={watchListCardData.heading}
                        items={watchListCardData.items}
                        className="shrink-0 p-2 gap-2 [&>div:last-child]:gap-1"
                    />
                    <CardDataHorizontal heading={metricSourceData.heading} allDataHref={metricSourceData.allDataHref} items={metricSourceData.items} className="shrink-0" />
                    <CardDataMedia heading={cctvMediaData.heading} allDataHref={cctvMediaData.allDataHref} items={cctvMediaData.items} className="flex-1 min-h-0 overflow-hidden" />
                </div>
            </div>
        </div>
    );
}