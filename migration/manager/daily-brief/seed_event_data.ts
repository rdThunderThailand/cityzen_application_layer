import type { ComponentType } from 'react';
import { AlertTriangle, Archive, Truck, Gift } from 'lucide-react';

export interface TodayIssueItem {
    title: string;
    subtitle: string;
    badgeText: string;      // "+31%", "85%", "18 min", "120 Meals"
    badgeTone: 'rose' | 'amber' | 'blue' | 'emerald';
    icon: ComponentType<{ className?: string }>;
}

export const cardEventData: TodayIssueItem[] = [
    { title: 'Breakfast Buffet', subtitle: 'ปริมาณขยะสูงกว่าค่าเฉลี่ย 7 วัน', badgeText: '+31%', badgeTone: 'rose', icon: AlertTriangle },
    { title: 'Kitchen B (Main Kitchen)', subtitle: 'ความจุถังเก็บใกล้เต็ม', badgeText: '85%', badgeTone: 'amber', icon: Archive },
    { title: 'Pickup Delay', subtitle: 'รถเก็บขยะล่าช้า คาดว่าจะถึง 14:18', badgeText: '18 min', badgeTone: 'amber', icon: Truck },
    { title: 'Food Donation', subtitle: 'พร้อมบริจาควันนี้ มูลค่าประมาณ 6,000 บาท', badgeText: '120 Meals', badgeTone: 'emerald', icon: Gift },
];
