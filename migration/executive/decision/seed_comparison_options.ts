export interface ComparisonOption {
  label: string;
  title: string;
  budget: string;
  impactLabel: string;
  impactClassName: string;
  duration: string;
  riskLabel: string;
  riskClassName: string;
  rating: number;
}

export const comparisonOptionData = {
  heading: 'ข้อเสนอเปรียบเทียบ',
  allDataHref: '#',
  items: [
    {
      label: 'A',
      title: 'แผนเพิ่มรูปแบบ',
      budget: '32.45 อบ.',
      impactLabel: 'สูงมาก',
      impactClassName: 'text-rose-500',
      duration: '30 วัน',
      riskLabel: 'ปานกลาง',
      riskClassName: 'text-amber-500',
      rating: 4,
    },
    {
      label: 'B',
      title: 'แผนเร่งด่วน',
      budget: '18.20 อบ.',
      impactLabel: 'สูง',
      impactClassName: 'text-orange-500',
      duration: '15 วัน',
      riskLabel: 'ต่ำ',
      riskClassName: 'text-emerald-500',
      rating: 5,
    },
    {
      label: 'C',
      title: 'แผนประหยัด',
      budget: '9.80 อบ.',
      impactLabel: 'ปานกลาง',
      impactClassName: 'text-amber-500',
      duration: '30 วัน',
      riskLabel: 'ต่ำ',
      riskClassName: 'text-emerald-500',
      rating: 3,
    },
  ] satisfies ComparisonOption[],
};
