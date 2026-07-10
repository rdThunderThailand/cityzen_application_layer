export interface WeeklyComparisonRow {
  metric: string;
  currentWeek: string;
  previousWeek: string;
  changeLabel: string;
  isPositive: boolean;
}

export const weeklyComparisonData = {
  heading: 'เปรียบเทียบผลลัพธ์รายสัปดาห์',
  allDataHref: '#',
  items: [
    { metric: 'ประชาชนได้รับประโยชน์ (คน)', currentWeek: '856,250', previousWeek: '724,680', changeLabel: '18%', isPositive: true },
    { metric: 'ลดความเสี่ยง (เหตุการณ์)', currentWeek: '5,248', previousWeek: '6,896', changeLabel: '24%', isPositive: true },
    { metric: 'ลดความเสียหาย (ล้านบาท)', currentWeek: '128.42', previousWeek: '164.30', changeLabel: '22%', isPositive: true },
    { metric: 'เวลาตอบสนองเฉลี่ย (นาที)', currentWeek: '32', previousWeek: '45', changeLabel: '28%', isPositive: true },
    { metric: 'ความพึงพอใจประชาชน (คะแนน)', currentWeek: '4.6', previousWeek: '4.0', changeLabel: '0.6', isPositive: true },
  ] satisfies WeeklyComparisonRow[],
};
