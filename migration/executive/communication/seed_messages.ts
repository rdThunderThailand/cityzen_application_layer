export type MessagePriorityKey = 'urgent' | 'important' | 'general';

export interface RecentMessageItem {
  priority: MessagePriorityKey;
  imageUrl: string;
  title: string;
  sentAt: string;
  reach: string;
  statusLabel: string;
}

export const messagePriorityConfig: Record<MessagePriorityKey, { label: string; className: string }> = {
  urgent: { label: 'ด่วนที่สุด', className: 'bg-rose-50 text-rose-600' },
  important: { label: 'สำคัญ', className: 'bg-amber-50 text-amber-600' },
  general: { label: 'ทั่วไป', className: 'bg-slate-100 text-slate-500' },
};

export const recentMessageData = {
  heading: 'ข้อความล่าสุด',
  allDataHref: '#',
  items: [
    {
      priority: 'urgent',
      imageUrl: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=200&auto=format&fit=crop&q=60',
      title: 'เตือนฝนตกหนักถึงหนักมาก ในพื้นที่ อ.ภูเก็ต',
      sentAt: 'ส่งเมื่อ 18 ก.ค. 2567 07:45 น.',
      reach: 'เข้าถึง 512,680 คน',
      statusLabel: 'สำเร็จ',
    },
    {
      priority: 'important',
      imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&auto=format&fit=crop&q=60',
      title: 'เปิดศูนย์พักพิงชั่วคราว 12 แห่ง ในพื้นที่เสี่ยง',
      sentAt: 'ส่งเมื่อ 18 ก.ค. 2567 06:30 น.',
      reach: 'เข้าถึง 286,450 คน',
      statusLabel: 'สำเร็จ',
    },
    {
      priority: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=60',
      title: 'โครงการเก็บขยะชายหาด ประจำเดือนกรกฎาคม',
      sentAt: 'ส่งเมื่อ 17 ก.ค. 2567 18:00 น.',
      reach: 'เข้าถึง 156,320 คน',
      statusLabel: 'สำเร็จ',
    },
    {
      priority: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&auto=format&fit=crop&q=60',
      title: 'ประชาสัมพันธ์งานเทศกาลอาหารทะเลภูเก็ต 2567',
      sentAt: 'ส่งเมื่อ 17 ก.ค. 2567 09:15 น.',
      reach: 'เข้าถึง 112,840 คน',
      statusLabel: 'สำเร็จ',
    },
    {
      priority: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=200&auto=format&fit=crop&q=60',
      title: 'แจ้งปิดการจราจร ถนนบางลา ช่วงเย็นวันนี้',
      sentAt: 'ส่งเมื่อ 16 ก.ค. 2567 16:40 น.',
      reach: 'เข้าถึง 98,500 คน',
      statusLabel: 'สำเร็จ',
    },
  ] satisfies RecentMessageItem[],
};
