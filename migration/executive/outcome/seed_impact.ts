export interface ImpactTile {
  label: string;
  value: string;
  unit: string;
  trendValue: number;
  trendLabel: string;
}

export const impactTiles: ImpactTile[] = [
  { label: 'ประชาชนได้รับประโยชน์', value: '856,250', unit: 'คน', trendValue: 18, trendLabel: '18%' },
  { label: 'ลดความเสี่ยงเดือดร้อน', value: '5,248', unit: 'เหตุการณ์', trendValue: -24, trendLabel: '24%' },
  { label: 'ลดความเสียหายทางเศรษฐกิจ', value: '128.42', unit: 'ล้านบาท', trendValue: -22, trendLabel: '22%' },
];

export interface ImpactChartSeries {
  key: string;
  label: string;
  colorHex: string;
  data: number[];
}

export const impactChartHeading = 'แนวโน้มผลกระทบต่อประชาชน';
export const impactChartXLabels = ['11 ก.ค.', '12 ก.ค.', '13 ก.ค.', '14 ก.ค.', '15 ก.ค.', '16 ก.ค.', '17 ก.ค.', '18 ก.ค.'];
export const impactChartYMax = 1_000_000;

export const impactChartSeries: ImpactChartSeries[] = [
  { key: 'beneficiaries', label: 'ประชาชนได้รับประโยชน์ (คน)', colorHex: '#10b981', data: [680000, 720000, 700000, 760000, 790000, 770000, 830000, 856250] },
  { key: 'riskEvents', label: 'ลดความเสี่ยง (เหตุการณ์)', colorHex: '#3b82f6', data: [220000, 240000, 210000, 260000, 250000, 270000, 255000, 248000] },
  { key: 'damageAvoided', label: 'ลดความเสียหาย (ล้านบาท)', colorHex: '#f97316', data: [60000, 70000, 65000, 80000, 75000, 90000, 95000, 98000] },
];
