import { Sprout, TrendingUp, UsersRound, Cloud, Truck } from 'lucide-react';

export const wasteData: Array<{
    title: string; value: number | string; unit: string; icon: typeof Sprout;
    subValue: number | null; subUnit: string | null; positiveData?: boolean; subtitle:string;
}> = [
    { title: "Organic Generated (วันนี้)", value: 524, unit: "kg", icon: Sprout, subValue: 14, subUnit: "%", subtitle: " จากเมื่อวาน (460 kg)", positiveData: false },
    { title: "Prediction (พรุ่งนี้)", value: 560, unit: "kg", icon: TrendingUp, subValue: 9, subUnit: "%", subtitle: " คาดการณ์ 97%", positiveData: false },
    { title: "Waste per Guest (7 วัน)", value: 0.36, unit: "kg", icon: UsersRound, subValue: -0.05, subUnit: "", subtitle: " จากค่าเฉลี่ย 7 วัน", positiveData: true },
    { title: "Carbon Saving (7 วัน)", value: 128, unit: "kgCO2e", icon: Cloud, subValue: 18, subUnit: "%", subtitle: " จากค่าเฉลี่ย 7 วัน", positiveData: true },
    { title: "Pickup (วันนี้)", value: "14:00", unit: "รอบเดียว", icon: Truck, subValue: null, subUnit: null, subtitle: "โดย Green Waste Co., Ltd."},
];