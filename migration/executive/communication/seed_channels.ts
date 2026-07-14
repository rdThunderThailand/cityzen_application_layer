import type { ComponentType } from 'react';
import { MessageCircle, Users2, MessageSquare, Globe, Megaphone } from 'lucide-react';

export interface CommunicationChannel {
  icon: ComponentType<{ className?: string }>;
  iconWrapperClass: string;
  name: string;
  handle?: string;
  reach: number;
  openRate: number | null;
  engagementRate: number | null;
  trendData: number[] | null;
}

export const communicationChannelData = {
  heading: 'ช่องทางการสื่อสาร',
  items: [
    {
      icon: MessageCircle,
      iconWrapperClass: 'bg-emerald-50 text-emerald-500',
      name: 'LINE Official Account',
      handle: '@phuketcity',
      reach: 512680,
      openRate: 78.6,
      engagementRate: 13.6,
      trendData: [5, 7, 6, 9, 13.6],
    },
    {
      icon: Users2,
      iconWrapperClass: 'bg-blue-50 text-blue-500',
      name: 'Facebook Page',
      handle: 'Phuket City',
      reach: 286450,
      openRate: 65.2,
      engagementRate: 10.4,
      trendData: [8, 9, 7, 10, 10.4],
    },
    {
      icon: MessageSquare,
      iconWrapperClass: 'bg-purple-50 text-purple-500',
      name: 'SMS แจ้งเตือน',
      reach: 42680,
      openRate: 92.1,
      engagementRate: 4.2,
      trendData: [3, 4, 3.5, 4, 4.2],
    },
    {
      icon: Globe,
      iconWrapperClass: 'bg-sky-50 text-sky-500',
      name: 'Website / Popup',
      reach: 12840,
      openRate: 48.3,
      engagementRate: 6.1,
      trendData: [7, 5, 6, 5.5, 6.1],
    },
    {
      icon: Megaphone,
      iconWrapperClass: 'bg-amber-50 text-amber-500',
      name: 'เสียงตามสาย / หอกระจายข่าว',
      reach: 2600,
      openRate: null,
      engagementRate: null,
      trendData: null,
    },
  ] satisfies CommunicationChannel[],
};
