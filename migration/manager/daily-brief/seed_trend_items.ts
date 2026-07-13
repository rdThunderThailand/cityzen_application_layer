export interface DayTrendPoint { label: string; kg: number; }

export const wasteTrend7d: DayTrendPoint[] = [
    { label: "12 ก.ค.", kg: 470 },
    { label: "13 ก.ค.", kg: 510 },
    { label: "14 ก.ค.", kg: 455 },
    { label: "15 ก.ค.", kg: 500 },
    { label: "16 ก.ค.", kg: 480 },
    { label: "17 ก.ค.", kg: 460 },
    { label: "18 ก.ค.", kg: 524 },
];

export const wasteTrendSummary = [
    { label: "วันนี้ (18 ก.ค.)", kg: 524, deltaText: "+14%", positive: false },
    { label: "เมื่อวาน (17 ก.ค.)", kg: 460, deltaText: null, positive: null },
    { label: "ค่าเฉลี่ย 7 วัน", kg: 462, deltaText: null, positive: null },
    { label: "ค่าเฉลี่ย 30 วัน", kg: 445, deltaText: null, positive: null },
];