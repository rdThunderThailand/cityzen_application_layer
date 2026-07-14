import { Smile, Meh, Frown } from 'lucide-react';
import type { ComponentType } from 'react';

export const sentimentBreakdown = {
  heading: 'การรับรู้ของประชาชน (Sentiment)',
  allDataHref: '#',
  positive: 78,
  neutral: 15,
  negative: 7,
};

export type SentimentKey = 'positive' | 'neutral' | 'negative';

export const sentimentConfig: Record<SentimentKey, { label: string; colorHex: string; className: string }> = {
  positive: { label: 'เชิงบวก', colorHex: '#10b981', className: 'text-emerald-500' },
  neutral: { label: 'เป็นกลาง', colorHex: '#94a3b8', className: 'text-slate-400' },
  negative: { label: 'เชิงลบ', colorHex: '#f43f5e', className: 'text-rose-500' },
};

export interface SentimentComment {
  sentiment: SentimentKey;
  icon: ComponentType<{ className?: string }>;
  quote: string;
  source: string;
  timestamp: string;
}

export const sentimentCommentData = {
  heading: 'ตัวอย่างความคิดเห็น',
  allDataHref: '#',
  items: [
    {
      sentiment: 'positive',
      icon: Smile,
      quote: 'ขอบคุณที่แจ้งเตือนล่วงหน้า ทำให้เตรียมตัวได้ทันค่ะ',
      source: 'คุณสมใจ, อ.เมือง',
      timestamp: '18 ก.ค. 07:48 น.',
    },
    {
      sentiment: 'neutral',
      icon: Meh,
      quote: 'อยากให้เพิ่มจุดพักพิงในโซนป่าตองด้วยค่ะ',
      source: 'คุณวิชัย, อ.กะทู้',
      timestamp: '18 ก.ค. 07:30 น.',
    },
    {
      sentiment: 'negative',
      icon: Frown,
      quote: 'น้ำประปาแรงบางจุดยังท่วมอยู่ครับ',
      source: 'คุณเอกชัย, อ.ถลาง',
      timestamp: '18 ก.ค. 07:20 น.',
    },
  ] satisfies SentimentComment[],
};
