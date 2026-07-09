import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const situationMetricsData = [
    {
        value: 3,
        unit: "วิกฤต",
        icon: AlertCircle, // Warning/exclamation icon
        subtitle: "ใกล้ถึงขีดจำกัด",
        positiveData: false, // Triggers custom evaluation or default trend styling
        className: "[&_div:first-child]:bg-amber-50 [&_div:first-child]:text-amber-500 border-slate-100"
    },
    {
        value: 8,
        unit: "เฝ้าระวัง",
        icon: AlertCircle, // Warning/exclamation icon
        subtitle: "ใกล้ถึงขีดจำกัด",
        positiveData: false, // Triggers custom evaluation or default trend styling
        className: "[&_div:first-child]:bg-amber-50 [&_div:first-child]:text-amber-500 border-slate-100"
    },
    {
        value: 15,
        unit: "ติดตาม",
        icon: Clock, // Clock/time icon
        subtitle: "เฝ้าติดตามสถานการณ์อย่างต่อเนื่อง",
        positiveData: false,
        className: "[&_div:first-child]:bg-orange-50 [&_div:first-child]:text-orange-500 border-slate-100"
    },
    {
        value: 42,
        unit: "ปกติ",
        icon: CheckCircle2, // Checkmark icon
        subtitle: "สถานการณ์ปกติ",
        positiveData: true,
        className: "[&_div:first-child]:bg-green-50 [&_div:first-child]:text-green-500 border-slate-100"
    }
];