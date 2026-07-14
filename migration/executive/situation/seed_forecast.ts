import { CloudRain, Droplet, Waves, Cone, HeartPulse } from 'lucide-react';
import type { CardDataProps } from '@/components/dashboard/CardData';

export const forecastTrendCardData: CardDataProps = {
    heading: 'แนวโน้ม 24 ชั่วโมงข้างหน้า',
    allDataHref: '#',
    maxItems: 5,
    variant: 'icon',
    items: [
        {
            title: 'ฝนตกหนัก',
            subtitle: 'ในช่วงบ่ายถึงค่ำ',
            icon: CloudRain,
            status: 'increasing',
        },
        {
            title: 'น้ำท่วมฉับพลัน',
            subtitle: 'พื้นที่สูงต่ำ',
            icon: Droplet,
            status: 'stable',
        },
        {
            title: 'คลื่นแรง',
            subtitle: 'ฝั่งวันตก',
            icon: Waves,
            status: 'stable',
        },
        {
            title: 'การจราจร',
            subtitle: 'ติดขัดเลยเส้นทาง',
            icon: Cone,
            status: 'increasing',
        },
        {
            title: 'โรคติดต่อทางเดินหายใจ',
            subtitle: 'กลุ่มเด็กและผู้สูงอายุ',
            icon: HeartPulse,
            status: 'decreasing',
        }
    ]
};