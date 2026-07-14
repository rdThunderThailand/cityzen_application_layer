export interface RadarSeries {
  key: string;
  label: string;
  colorHex: string;
  dashed?: boolean;
  fill?: boolean;
  values: number[];
}

export const radarAxisLabels = [
  'ความปลอดภัยในชีวิต',
  'เศรษฐกิจและรายได้',
  'สิ่งแวดล้อม',
  'คุณภาพชีวิต',
  'โครงสร้างพื้นฐาน',
  'การบริการภาครัฐ',
];

export const dimensionRadarData = {
  heading: 'ผลลัพธ์ตามมิติการดำเนินงาน',
  allDataHref: '#',
  series: [
    { key: 'current', label: 'สัปดาห์นี้', colorHex: '#14b8a6', fill: true, values: [88, 75, 90, 82, 78, 85] },
    { key: 'previous', label: 'สัปดาห์ก่อน', colorHex: '#3b82f6', values: [80, 68, 85, 75, 72, 78] },
    { key: 'target', label: 'เป้าหมาย', colorHex: '#f97316', dashed: true, values: [90, 80, 95, 85, 80, 90] },
  ] satisfies RadarSeries[],
};
