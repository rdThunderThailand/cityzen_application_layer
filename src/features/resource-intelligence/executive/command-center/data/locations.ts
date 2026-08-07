import { LayerKey } from '@/features/resource-intelligence/executive/command-center/DashboardContext';

export interface MapNode {
  id: string;
  name: string;
  type: LayerKey;
  color: string;
  lon: number;
  lat: number;
  val: string;
}

export const NODES: MapNode[] = [
  { id: 'patong', name: 'ป่าตอง', type: 'generator', color: '#22c55e', lon: 98.2965, lat: 7.8961, val: '31 ตัน' },
  { id: 'thalang', name: 'ถลาง', type: 'generator', color: '#22c55e', lon: 98.3300, lat: 8.0300, val: '28 ตัน' },
  { id: 'kathu', name: 'กะทู้', type: 'inspection', color: '#f97316', lon: 98.3300, lat: 7.9200, val: '42 ตัน' },
  { id: 'rawai', name: 'ราไวย์', type: 'collection', color: '#f59e0b', lon: 98.3200, lat: 7.7800, val: '12 ตัน' },
  { id: 'phuket_town', name: 'เมืองภูเก็ต', type: 'processing', color: '#3b82f6', lon: 98.3800, lat: 7.8800, val: '36 ตัน' },
  { id: 'chalong', name: 'ฉลอง', type: 'utilization', color: '#8b5cf6', lon: 98.3400, lat: 7.8200, val: '22 ตัน' },
];

// Voice-recognizable aliases per node, EN + TH, for matching "go to <place>" commands.
export const LOCATION_ALIASES: Record<string, string[]> = {
  patong: ['patong', 'ป่าตอง'],
  thalang: ['thalang', 'ถลาง'],
  kathu: ['kathu', 'กะทู้'],
  rawai: ['rawai', 'ราไวย์'],
  phuket_town: ['phuket town', 'phuket', 'เมืองภูเก็ต', 'ภูเก็ต'],
  chalong: ['chalong', 'ฉลอง'],
};

// Data behind the area drill-down page (opened by a "go to <place>" voice
// command or a marker click). Every area carries its own full generator →
// collection → inspection → processing → utilization pipeline, independent
// of the single `type` tag NODES uses for the overview-map layer filter.
export interface AreaBreakdownItem {
  key: string;
  label: string;
  color: string;
  tons: number;
  pct: number;
}

export interface AreaInsight {
  type: 'success' | 'info' | 'warning';
  title: string;
  desc: string;
}

export interface AreaDetail {
  todayTons: number;
  todayTrendPct: number;
  separationRatePct: number;
  separationTrendPct: number;
  organicScore: number;
  organicScoreTrendPts: number;
  weekTrend: number[];
  vsProvince: { organicPct: number; separationPct: number; organicScorePts: number };
  breakdown: AreaBreakdownItem[];
  separationTrend: number[];
  collection: { trips: number; tripsTrendCount: number; tonsCollected: number; coveragePct: number; routesActive: number; routesTotal: number };
  inspection: { passedTons: number; passedPct: number; failedTons: number; failedPct: number; issues: string };
  processing: { sentTons: number; sentTrendPct: number; capacityPct: number; remainingTons: number };
  utilization: { smartBinsTons: number; energyKwh: number; otherMaterialsTons: number };
  aiInsights: AreaInsight[];
}

export const AREA_DETAILS: Record<string, AreaDetail> = {
  patong: {
    todayTons: 28.6, todayTrendPct: 18,
    separationRatePct: 45, separationTrendPct: 6,
    organicScore: 72, organicScoreTrendPts: 12,
    weekTrend: [22, 25, 21, 26, 24, 27, 28.6],
    vsProvince: { organicPct: 18, separationPct: 6, organicScorePts: 12 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 12.4, pct: 43 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 6.8, pct: 24 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 4.2, pct: 15 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 2.1, pct: 7 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 3.1, pct: 11 },
    ],
    separationTrend: [38, 42, 40, 44, 43, 45],
    collection: { trips: 18, tripsTrendCount: 2, tonsCollected: 28.6, coveragePct: 92, routesActive: 18, routesTotal: 20 },
    inspection: { passedTons: 26.8, passedPct: 94, failedTons: 1.8, failedPct: 6, issues: 'สิ่งปนเปื้อนพลาสติก, เศษแก้ว' },
    processing: { sentTons: 24.5, sentTrendPct: 15, capacityPct: 68, remainingTons: 4.1 },
    utilization: { smartBinsTons: 8.7, energyKwh: 12450, otherMaterialsTons: 3.2 },
    aiInsights: [
      { type: 'success', title: 'ปริมาณ Organic เพิ่มขึ้น 18%', desc: 'หลักจากโรงแรมเพิ่มขึ้นจากช่วงไฮซีซั่น' },
      { type: 'info', title: 'อัตราการแยกต้นทางเพิ่มขึ้น 6%', desc: 'แนะนำส่งเสริมชุมชนต่อเนื่อง' },
      { type: 'warning', title: 'พบสิ่งปนเปื้อนเพิ่มขึ้น 12%', desc: 'ควรจัดกิจกรรมให้ความรู้ร้านค้าในตลาด' },
    ],
  },
  thalang: {
    todayTons: 24.3, todayTrendPct: 9,
    separationRatePct: 38, separationTrendPct: 4,
    organicScore: 65, organicScoreTrendPts: 7,
    weekTrend: [19, 21, 20, 23, 22, 24, 24.3],
    vsProvince: { organicPct: 9, separationPct: 4, organicScorePts: 7 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 4.5, pct: 19 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 3.2, pct: 13 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 8.6, pct: 35 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 3.0, pct: 12 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 5.0, pct: 21 },
    ],
    separationTrend: [30, 33, 35, 34, 36, 38],
    collection: { trips: 14, tripsTrendCount: 1, tonsCollected: 24.3, coveragePct: 85, routesActive: 14, routesTotal: 16 },
    inspection: { passedTons: 22.1, passedPct: 91, failedTons: 2.2, failedPct: 9, issues: 'เศษพลาสติกจากตลาดสด' },
    processing: { sentTons: 19.8, sentTrendPct: 10, capacityPct: 55, remainingTons: 3.5 },
    utilization: { smartBinsTons: 6.1, energyKwh: 8200, otherMaterialsTons: 2.4 },
    aiInsights: [
      { type: 'success', title: 'ปริมาณ Organic เพิ่มขึ้น 9%', desc: 'ตลาดสดถลางเป็นแหล่งกำเนิดหลักของพื้นที่' },
      { type: 'info', title: 'Coverage เส้นทางเก็บอยู่ที่ 85%', desc: 'ยังมีพื้นที่รอบนอกที่ยังไม่ครอบคลุม' },
      { type: 'warning', title: 'พบเศษพลาสติกปนเปื้อน 9%', desc: 'ควรเพิ่มจุดคัดแยกที่ตลาดสด' },
    ],
  },
  kathu: {
    todayTons: 33.5, todayTrendPct: -4,
    separationRatePct: 29, separationTrendPct: -3,
    organicScore: 51, organicScoreTrendPts: -6,
    weekTrend: [36, 35, 34, 33, 32, 33, 33.5],
    vsProvince: { organicPct: -4, separationPct: -3, organicScorePts: -6 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 6.0, pct: 18 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 9.8, pct: 29 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 11.2, pct: 33 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 2.5, pct: 7 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 4.0, pct: 12 },
    ],
    separationTrend: [34, 32, 30, 29, 28, 29],
    collection: { trips: 20, tripsTrendCount: -1, tonsCollected: 33.5, coveragePct: 78, routesActive: 15, routesTotal: 20 },
    inspection: { passedTons: 25.9, passedPct: 77, failedTons: 7.6, failedPct: 23, issues: 'สิ่งปนเปื้อนพลาสติกสูง, น้ำมันทอดซ้ำ' },
    processing: { sentTons: 21.0, sentTrendPct: -5, capacityPct: 82, remainingTons: 4.9 },
    utilization: { smartBinsTons: 5.4, energyKwh: 7100, otherMaterialsTons: 4.8 },
    aiInsights: [
      { type: 'warning', title: 'พบการปนเปื้อนสูง', desc: 'ตลาดกะทู้มี Organic Score ต่ำกว่าค่าเฉลี่ยจังหวัด' },
      { type: 'warning', title: 'Organic Score ลดลง 6 คะแนน', desc: 'อัตราผ่านเกณฑ์ตรวจคุณภาพลดลงเหลือ 77%' },
      { type: 'info', title: 'เส้นทางเก็บใช้งานจริง 15/20', desc: 'แนะนำทบทวนแผนเส้นทางเก็บรวบรวม' },
    ],
  },
  rawai: {
    todayTons: 15.2, todayTrendPct: 11,
    separationRatePct: 52, separationTrendPct: 8,
    organicScore: 78, organicScoreTrendPts: 9,
    weekTrend: [12, 13, 12.5, 14, 13.8, 14.5, 15.2],
    vsProvince: { organicPct: 11, separationPct: 8, organicScorePts: 9 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 3.1, pct: 20 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 5.8, pct: 38 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 2.4, pct: 16 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 1.2, pct: 8 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 2.7, pct: 18 },
    ],
    separationTrend: [46, 48, 49, 50, 51, 52],
    collection: { trips: 10, tripsTrendCount: 1, tonsCollected: 15.2, coveragePct: 95, routesActive: 10, routesTotal: 10 },
    inspection: { passedTons: 14.6, passedPct: 96, failedTons: 0.6, failedPct: 4, issues: 'ไม่มีปัญหาสำคัญ' },
    processing: { sentTons: 13.1, sentTrendPct: 12, capacityPct: 40, remainingTons: 1.5 },
    utilization: { smartBinsTons: 4.9, energyKwh: 6300, otherMaterialsTons: 1.1 },
    aiInsights: [
      { type: 'success', title: 'Organic Score สูงสุดในจังหวัด', desc: 'ร้านอาหารริมหาดแยกต้นทางได้ดีต่อเนื่อง' },
      { type: 'success', title: 'Coverage เส้นทางเก็บ 95%', desc: 'ครอบคลุมเกือบทั้งพื้นที่ราไวย์' },
      { type: 'info', title: 'กำลังการแปรรูปเหลือ 60%', desc: 'มีศักยภาพรับปริมาณเพิ่มจากพื้นที่ใกล้เคียง' },
    ],
  },
  phuket_town: {
    todayTons: 41.8, todayTrendPct: 14,
    separationRatePct: 41, separationTrendPct: 5,
    organicScore: 68, organicScoreTrendPts: 4,
    weekTrend: [35, 37, 36, 39, 38, 40, 41.8],
    vsProvince: { organicPct: 14, separationPct: 5, organicScorePts: 4 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 9.5, pct: 23 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 14.2, pct: 34 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 8.9, pct: 21 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 3.6, pct: 9 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 5.6, pct: 13 },
    ],
    separationTrend: [36, 38, 39, 40, 40, 41],
    collection: { trips: 26, tripsTrendCount: 3, tonsCollected: 41.8, coveragePct: 90, routesActive: 24, routesTotal: 26 },
    inspection: { passedTons: 38.9, passedPct: 93, failedTons: 2.9, failedPct: 7, issues: 'เศษอาหารปนบรรจุภัณฑ์' },
    processing: { sentTons: 36.4, sentTrendPct: 16, capacityPct: 74, remainingTons: 5.4 },
    utilization: { smartBinsTons: 11.2, energyKwh: 15800, otherMaterialsTons: 4.0 },
    aiInsights: [
      { type: 'success', title: 'ปริมาณ Organic สูงสุดในจังหวัด', desc: 'ย่านเมืองเก่าและร้านอาหารเป็นแหล่งกำเนิดหลัก' },
      { type: 'info', title: 'กำลังการแปรรูปใช้งาน 74%', desc: 'ใกล้เต็มกำลัง ควรวางแผนขยายกำลังผลิต' },
      { type: 'warning', title: 'พบบรรจุภัณฑ์ปนเปื้อน 7%', desc: 'แนะนำรณรงค์แยกขยะกับร้านอาหารในเขตเมือง' },
    ],
  },
  chalong: {
    todayTons: 19.9, todayTrendPct: 6,
    separationRatePct: 60, separationTrendPct: 10,
    organicScore: 81, organicScoreTrendPts: 15,
    weekTrend: [16, 17, 17.5, 18, 18.6, 19, 19.9],
    vsProvince: { organicPct: 6, separationPct: 10, organicScorePts: 15 },
    breakdown: [
      { key: 'hotel', label: 'โรงแรม', color: '#22c55e', tons: 2.8, pct: 14 },
      { key: 'restaurant', label: 'ร้านอาหาร', color: '#f59e0b', tons: 3.6, pct: 18 },
      { key: 'market', label: 'ตลาดสด', color: '#3b82f6', tons: 3.0, pct: 15 },
      { key: 'school', label: 'โรงเรียน', color: '#8b5cf6', tons: 2.5, pct: 13 },
      { key: 'community', label: 'ชุมชน / อื่นๆ', color: '#06b6d4', tons: 8.0, pct: 40 },
    ],
    separationTrend: [52, 55, 57, 58, 59, 60],
    collection: { trips: 12, tripsTrendCount: 2, tonsCollected: 19.9, coveragePct: 97, routesActive: 12, routesTotal: 12 },
    inspection: { passedTons: 19.3, passedPct: 97, failedTons: 0.6, failedPct: 3, issues: 'ไม่มีปัญหาสำคัญ' },
    processing: { sentTons: 18.0, sentTrendPct: 9, capacityPct: 88, remainingTons: 1.9 },
    utilization: { smartBinsTons: 12.6, energyKwh: 21500, otherMaterialsTons: 2.3 },
    aiInsights: [
      { type: 'success', title: 'Organic Score เพิ่มขึ้น 15 คะแนน', desc: 'โรงไฟฟ้าชีวมวลฉลองผลิตพลังงานได้สูงสุดในจังหวัด' },
      { type: 'success', title: 'อัตราการแยกต้นทางสูงสุด 60%', desc: 'ชุมชนรอบนิคมอุตสาหกรรมให้ความร่วมมือดี' },
      { type: 'warning', title: 'กำลังการแปรรูปใช้งาน 88%', desc: 'ใกล้เต็มกำลังการผลิต ควรวางแผนขยายโรงงาน' },
    ],
  },
};

export function getAreaDetail(id: string): AreaDetail | undefined {
  return AREA_DETAILS[id];
}

// Small deterministic offsets (degrees) to scatter up to 5 breakdown-source
// pins around a node's coordinate on the area detail map.
export const BREAKDOWN_PIN_OFFSETS: { dx: number; dy: number }[] = [
  { dx: -0.020, dy: 0.015 },
  { dx: -0.006, dy: -0.006 },
  { dx: 0.010, dy: 0.013 },
  { dx: 0.024, dy: -0.002 },
  { dx: 0.032, dy: -0.016 },
];
