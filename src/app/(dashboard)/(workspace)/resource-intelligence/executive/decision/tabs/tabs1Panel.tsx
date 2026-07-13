import { ChevronRight, MapPin, Paperclip, Info, Star } from "lucide-react";
import { cn } from "@/utils/cn";
import {
    decisionItemData,
    decisionUrgencyConfig,
    decisionImpactConfig,
} from "../../../../../../../../migration/executive/decision/seed_decision_items";
import {
    impactForecastTiles,
    impactChartSeries,
    impactChartXLabels,
    impactChartYMax,
} from "../../../../../../../../migration/executive/decision/seed_impact_forecast";
import { comparisonOptionData } from "../../../../../../../../migration/executive/decision/seed_comparison_options";
import {
    recentDecisionData,
    recentDecisionStatusConfig,
} from "../../../../../../../../migration/executive/decision/seed_recent_decisions";

const CHART_WIDTH = 300;
const CHART_HEIGHT = 150;
const CHART_GRID_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

function getChartPoints(data: number[], max: number) {
    return data.map((value, index) => ({
        x: data.length === 1 ? 0 : (index / (data.length - 1)) * CHART_WIDTH,
        y: CHART_HEIGHT - (value / max) * CHART_HEIGHT,
    }));
}

export function Tabs1Panel() {
    return (
        <div className="h-full min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden mt-4">
            {/* Left: decision items list — no existing component supports the badge + icon +
                right-aligned impact value row shape, so this list is composed inline. */}
            <div className="flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 p-4 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2 shrink-0">
                    <h3 className="text-sm font-semibold text-slate-800">
                        {decisionItemData.heading} ({decisionItemData.items.length})
                    </h3>
                    <a
                        href={decisionItemData.allDataHref}
                        className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                    >
                        ดูทั้งหมด
                        <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden flex flex-col divide-y divide-slate-50">
                    {decisionItemData.items.map((item, index) => {
                        const Icon = item.icon;
                        const urgency = decisionUrgencyConfig[item.urgency];
                        const impact = decisionImpactConfig[item.impact];
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3 py-3.5 first:pt-1 last:pb-1 px-2 -mx-2 rounded-lg hover:bg-slate-50/60 transition-colors cursor-pointer"
                            >
                                <div className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", item.iconWrapperClass)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className={cn("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1", urgency.className)}>
                                        {urgency.label}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.department}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                        <span className="flex items-center gap-1 truncate">
                                            <MapPin className="w-3 h-3 shrink-0" />
                                            พื้นที่: {item.areas}
                                        </span>
                                        <span className="flex items-center gap-1 truncate shrink-0">
                                            <Paperclip className="w-3 h-3 shrink-0" />
                                            {item.budgetLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0 gap-1 pl-2">
                                    <span className={cn("text-xs font-semibold whitespace-nowrap", impact.className)}>{impact.label}</span>
                                    <span className="text-base font-bold text-slate-800 whitespace-nowrap">{item.impactValue}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right column */}
            <div className="w-1/2 shrink-0 h-full min-h-0 flex flex-col gap-4 overflow-hidden">
                {/* Impact forecast — compact stat tiles + multi-series line chart, no existing
                    chart component in components/ so both are composed inline. */}
                <div className="shrink-0 flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                        <h3 className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                            คาดการณ์ผลกระทบหากตัดสินใจ
                            <Info className="w-3.5 h-3.5 text-slate-300" />
                        </h3>
                        <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0">
                            ดูทั้งหมด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {impactForecastTiles.map((tile, index) => {
                            const TileIcon = tile.icon;
                            return (
                                <div key={index} className="flex flex-col gap-1 p-2 border border-slate-100 rounded-lg min-w-0">
                                    <div className={cn("flex items-center justify-center w-6 h-6 rounded-full shrink-0", tile.iconWrapperClass)}>
                                        <TileIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 truncate">{tile.label}</span>
                                    <span className="text-sm font-bold text-slate-800 truncate">{tile.value}</span>
                                    <span className="text-[9px] text-slate-400 truncate">{tile.unit}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-1">
                        <span className="text-xs font-semibold text-slate-600">ผลกระทบรวมรายวัน (ล้านบาท)</span>

                        <div className="flex items-center gap-3 mt-2 mb-2 flex-wrap">
                            {impactChartSeries.map((series) => (
                                <span key={series.key} className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: series.strokeHex }} />
                                    {series.label}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between text-[9px] text-slate-300 h-[150px] py-1 shrink-0">
                                <span>1,000</span>
                                <span>750</span>
                                <span>500</span>
                                <span>250</span>
                                <span>0</span>
                            </div>
                            <div className="relative flex-1 h-[150px] min-w-0">
                                <svg
                                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                                    preserveAspectRatio="none"
                                    className="w-full h-full"
                                >
                                    {CHART_GRID_FRACTIONS.map((frac) => (
                                        <line
                                            key={frac}
                                            x1={0}
                                            x2={CHART_WIDTH}
                                            y1={frac * CHART_HEIGHT}
                                            y2={frac * CHART_HEIGHT}
                                            stroke="#f1f5f9"
                                            strokeWidth={1}
                                        />
                                    ))}
                                    {impactChartSeries.map((series) => {
                                        const points = getChartPoints(series.data, impactChartYMax);
                                        const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
                                        return (
                                            <g key={series.key}>
                                                <polyline
                                                    points={polylinePoints}
                                                    fill="none"
                                                    stroke={series.strokeHex}
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                {points.map((p, i) => (
                                                    <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={series.strokeHex} />
                                                ))}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                            <div className="relative w-16 h-[150px] shrink-0">
                                {impactChartSeries.map((series) => {
                                    const points = getChartPoints(series.data, impactChartYMax);
                                    const last = points[points.length - 1];
                                    return (
                                        <span
                                            key={series.key}
                                            className="absolute left-0 text-[9px] font-semibold whitespace-nowrap -translate-y-1/2"
                                            style={{
                                                color: series.strokeHex,
                                                top: `${(last.y / CHART_HEIGHT) * 100}%`,
                                            }}
                                        >
                                            {series.endLabel}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 pl-8 pr-16">
                            {impactChartXLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison table — no table component exists in components/, composed inline. */}
                <div className="shrink-0 flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                        <h3 className="text-sm font-semibold text-slate-800">{comparisonOptionData.heading}</h3>
                        <a
                            href={comparisonOptionData.allDataHref}
                            className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                        >
                            เปรียบเทียบละเอียด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-slate-400">
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ทางเลือก</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">งบประมาณ</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ผลกระทบ</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ระยะเวลา</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ความเสี่ยง</th>
                                    <th className="font-medium pb-2 whitespace-nowrap">ความคุ้มค่า</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {comparisonOptionData.items.map((option, index) => (
                                    <tr key={index}>
                                        <td className="py-2 pr-2">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                                    {option.label}
                                                </span>
                                                <span className="font-semibold text-slate-700 whitespace-nowrap">{option.title}</span>
                                            </span>
                                        </td>
                                        <td className="py-2 pr-2 text-slate-700 whitespace-nowrap">{option.budget}</td>
                                        <td className={cn("py-2 pr-2 font-semibold whitespace-nowrap", option.impactClassName)}>{option.impactLabel}</td>
                                        <td className="py-2 pr-2 text-slate-700 whitespace-nowrap">{option.duration}</td>
                                        <td className={cn("py-2 pr-2 font-semibold whitespace-nowrap", option.riskClassName)}>{option.riskLabel}</td>
                                        <td className="py-2">
                                            <span className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={cn(
                                                            "w-3 h-3",
                                                            starIndex < option.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                                        )}
                                                    />
                                                ))}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent decisions summary — status icon + two-line right-aligned value shape has
                    no matching CardData variant, composed inline. */}
                <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2 shrink-0">
                        <h3 className="text-sm font-semibold text-slate-800">{recentDecisionData.heading}</h3>
                        <a
                            href={recentDecisionData.allDataHref}
                            className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                        >
                            ดูทั้งหมด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden flex flex-col divide-y divide-slate-50">
                        {recentDecisionData.items.map((item, index) => {
                            const statusCfg = recentDecisionStatusConfig[item.status];
                            const StatusIcon = item.icon;
                            return (
                                <div key={index} className="flex items-start gap-3 py-3 first:pt-1 last:pb-1">
                                    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full shrink-0", statusCfg.iconWrapperClass)}>
                                        <StatusIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={cn("text-sm font-bold", statusCfg.className)}>{statusCfg.label}</span>
                                            <span className="text-[11px] text-slate-400 shrink-0 whitespace-nowrap">{item.timestamp}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 mt-0.5">
                                            <span className="text-xs text-slate-500 truncate">{item.title}</span>
                                            <span className="text-xs font-semibold text-slate-700 shrink-0 whitespace-nowrap">{item.budgetLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}