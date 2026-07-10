export type MissionCompletionKey = 'success' | 'in_progress' | 'failed' | 'cancelled';

export interface MissionCompletionSegment {
  key: MissionCompletionKey;
  label: string;
  count: number;
  percentage: number;
  colorHex: string;
  className: string;
}

export const missionCompletionData = {
  heading: 'การบรรลุเป้าหมายภารกิจ',
  allDataHref: '#',
  total: 24,
  totalLabel: 'ภารกิจ',
  segments: [
    { key: 'success', label: 'สำเร็จ', count: 21, percentage: 85, colorHex: '#10b981', className: 'text-emerald-500' },
    { key: 'in_progress', label: 'อยู่ระหว่างดำเนินการ', count: 2, percentage: 8, colorHex: '#3b82f6', className: 'text-blue-500' },
    { key: 'failed', label: 'ไม่สำเร็จ', count: 1, percentage: 4, colorHex: '#f97316', className: 'text-orange-500' },
    { key: 'cancelled', label: 'ยกเลิก', count: 0, percentage: 0, colorHex: '#cbd5e1', className: 'text-slate-400' },
  ] satisfies MissionCompletionSegment[],
};
