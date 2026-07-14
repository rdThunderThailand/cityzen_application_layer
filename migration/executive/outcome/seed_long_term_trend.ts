export interface LongTermTrendSeries {
  key: string;
  label: string;
  colorHex: string;
  data: number[];
  endValue: string;
  trendLabel: string;
}

export const longTermTrendHeading = 'แนวโน้มระยะยาว (8 สัปดาห์)';
export const longTermTrendAllDataHref = '#';
export const longTermTrendXLabels = ['สัปดาห์ก่อน', '-6', '-5', '-4', '-3', '-2', '-1', 'สัปดาห์นี้'];
export const longTermTrendYMax = 5;
export const longTermTrendYMin = 1;

export const longTermTrendSeries: LongTermTrendSeries[] = [
  { key: 'safety', label: 'ความปลอดภัย', colorHex: '#10b981', data: [4.0, 4.1, 4.0, 4.2, 4.3, 4.4, 4.5, 4.6], endValue: '4.6', trendLabel: '0.3' },
  { key: 'quality_of_life', label: 'คุณภาพชีวิต', colorHex: '#3b82f6', data: [3.7, 3.8, 3.9, 3.9, 4.0, 4.1, 4.2, 4.3], endValue: '4.3', trendLabel: '0.4' },
  { key: 'economy', label: 'เศรษฐกิจ', colorHex: '#a855f7', data: [3.6, 3.7, 3.7, 3.8, 3.9, 3.9, 4.0, 4.1], endValue: '4.1', trendLabel: '0.2' },
  { key: 'environment', label: 'สิ่งแวดล้อม', colorHex: '#f97316', data: [3.9, 4.0, 4.0, 4.1, 4.2, 4.2, 4.3, 4.4], endValue: '4.4', trendLabel: '0.3' },
];
