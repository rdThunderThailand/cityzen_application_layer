import { AreaBreakdownItem, AreaInsight } from './locations';

// Province-wide "today" figures shown on the overview page. Centralized here
// so the sidebar panel and the "summarize today" voice/click command can't
// drift apart — both read the same numbers.
export interface ProvinceToday {
  totalTons: number;
  totalTrendPct: number;
  diversionRatePct: number;
  diversionTrendPct: number;
}

export const PROVINCE_TODAY: ProvinceToday = {
  totalTons: 182,
  totalTrendPct: 8.6,
  diversionRatePct: 31,
  diversionTrendPct: 4,
};

// Sums to 182t / 100%, matching PROVINCE_TODAY.totalTons exactly.
export const TOP_SOURCES: AreaBreakdownItem[] = [
  { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 58, pct: 32 },
  { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 42, pct: 23 },
  { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 31, pct: 17 },
  { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 18, pct: 10 },
  { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 33, pct: 18 },
];

export const PROVINCE_ALERTS: (AreaInsight & { time: string })[] = [
  { type: 'warning', time: '10:15 AM', title: 'การปนเปื้อนสูง', desc: 'ตลาดบางเหลา (Organic Score ต่ำ)' },
  { type: 'success', time: '09:40 AM', title: 'แนวโน้มดีขึ้น', desc: 'แยกต้นทางเพิ่มขึ้น 4% จากสัปดาห์ที่ผ่านมา' },
];

// Shown under the AI Commander chat bubble in the right sidebar — distinct
// from PROVINCE_ALERTS (left sidebar), matching the source mockup's split.
// Single-line messages, so `desc` is unused here (kept empty to satisfy AreaInsight).
export const AI_COMMANDER_INSIGHTS: AreaInsight[] = [
  { type: 'warning', title: 'โรงแรมโซนป่าตองสร้าง Organic สูงกว่าปกติ 18%', desc: '' },
  { type: 'info', title: 'พบการปนเปื้อนสูงในตลาดบางกลาง', desc: '' },
  { type: 'success', title: 'มีศักยภาพสร้างมูลค่าเพิ่ม 2.8 ล้านบาท/เดือน หากเพิ่มการแยกต้นทางเป็น 45%', desc: '' },
];

export function getProvinceSummaryText(): string {
  return `วันนี้มี Organic Resource ${PROVINCE_TODAY.totalTons} ตัน แยกต้นทางแล้ว ${PROVINCE_TODAY.diversionRatePct}% เพิ่มขึ้นจากเมื่อวาน ${PROVINCE_TODAY.diversionTrendPct}%`;
}
