export interface TopProjectItem {
  imageUrl: string;
  title: string;
  impactPeople: string;
  impactPeopleValue: number;
  damageReduced: string;
}

export const topProjectData = {
  heading: 'โครงการ/มาตรการที่สร้างผลกระทบสูงสุด',
  allDataHref: '#',
  items: [
    {
      imageUrl: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=200&auto=format&fit=crop&q=60',
      title: 'ระบบเตือนภัยและเฝ้าระวังน้ำท่วม',
      impactPeople: '146,250 คน',
      impactPeopleValue: 146250,
      damageReduced: '32.45 ลบ.',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=200&auto=format&fit=crop&q=60',
      title: 'การจัดการจราจรช่วงเทศกาล',
      impactPeople: '128,600 คน',
      impactPeopleValue: 128600,
      damageReduced: '28.10 ลบ.',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=60',
      title: 'โครงการเก็บขยะชายหาด',
      impactPeople: '98,420 คน',
      impactPeopleValue: 98420,
      damageReduced: '18.75 ลบ.',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&auto=format&fit=crop&q=60',
      title: 'ศูนย์พักพิงชั่วคราวและช่วยเหลือ',
      impactPeople: '86,350 คน',
      impactPeopleValue: 86350,
      damageReduced: '15.60 ลบ.',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&auto=format&fit=crop&q=60',
      title: 'มาตรการลดฝุ่น PM2.5',
      impactPeople: '75,230 คน',
      impactPeopleValue: 75230,
      damageReduced: '12.40 ลบ.',
    },
  ] satisfies TopProjectItem[],
};
