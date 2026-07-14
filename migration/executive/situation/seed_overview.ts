import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const situationMetricsData = [
    {
        value: 3,
        status: "วิกฤต",
        icon: AlertCircle,
        subtitle: "ใกล้ถึงขีดจำกัด",
        positiveData: false,
        className: "[&_div:first-child]:bg-amber-50 [&_div:first-child]:text-amber-500 border-slate-100"
    },
    {
        value: 8,
        status: "เฝ้าระวัง",
        icon: AlertCircle,
        subtitle: "ใกล้ถึงขีดจำกัด",
        positiveData: false,
        className: "[&_div:first-child]:bg-amber-50 [&_div:first-child]:text-amber-500 border-slate-100"
    },
    {
        value: 15,
        status: "ติดตาม",
        icon: Clock,
        subtitle: "เฝ้าติดตามสถานการณ์อย่างต่อเนื่อง",
        positiveData: false,
        className: "[&_div:first-child]:bg-orange-50 [&_div:first-child]:text-orange-500 border-slate-100"
    },
    {
        value: 42,
        status: "ปกติ",
        icon: CheckCircle2,
        subtitle: "สถานการณ์ปกติ",
        positiveData: true,
        className: "[&_div:first-child]:bg-green-50 [&_div:first-child]:text-green-500 border-slate-100"
    }
];