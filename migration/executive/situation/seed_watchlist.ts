import { MapPin } from 'lucide-react';
import type { CardDataProps } from '@/components/dashboard/CardData';

export const watchListCardData: CardDataProps = {
    heading: 'พื้นที่ต้องเฝ้าระวังเป็นพิเศษ',
    allDataHref: '#',
    maxItems: 3,
    variant: 'icon',
    items: [
        {
            title: 'ชุมชนบางวัด (กะทู้)',
            icon: MapPin,
            status: 'critical',
            tone: 'rose',
        },
        {
            title: 'ชุมชนป่าตอง (กะทู้)',
            icon: MapPin,
            status: 'high_warning',
            tone: 'amber',
        },
        {
            title: 'ชุมชนรัษฎา (เมืองภูเก็ต)',
            icon: MapPin,
            status: 'warning',
            tone: 'amber',
        }
    ]
};