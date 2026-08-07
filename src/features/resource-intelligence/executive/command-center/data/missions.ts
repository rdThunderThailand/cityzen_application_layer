export type MissionIcon = 'home' | 'store' | 'school' | 'star';

export interface Mission {
  id: number;
  name: string;
  description: string;
  areaLabel: string;
  lon: number;
  lat: number;
  color: string;
  icon: MissionIcon;
  progressPct: number;
  targetLabel: string;
  targetValue: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
}

export const MISSIONS: Mission[] = [
  {
    id: 1,
    name: 'Patong Organic Mission',
    description: 'ลดการปนเปื้อน และเพิ่มการแยกต้นทาง โรงแรมโซนป่าตอง',
    areaLabel: 'ป่าตอง',
    lon: 98.2965, lat: 7.8961,
    color: '#22c55e', icon: 'home',
    progressPct: 65,
    targetLabel: 'แยกอินทรีย์เพิ่มขึ้น', targetValue: '+20%',
    startDate: '20 พ.ค. 68', endDate: '30 มิ.ย. 68', daysRemaining: 36,
  },
  {
    id: 2,
    name: 'Market Quality Mission',
    description: 'ยกระดับคุณภาพอินทรีย์ในตลาดสดกลาง',
    areaLabel: 'ตลาดกลาง',
    lon: 98.3300, lat: 7.9500,
    color: '#f97316', icon: 'store',
    progressPct: 40,
    targetLabel: 'Organic Score', targetValue: '> 70%',
    startDate: '8 พ.ค. 68', endDate: '15 มิ.ย. 68', daysRemaining: 21,
  },
  {
    id: 3,
    name: 'School Food Waste Mission',
    description: 'ลดขยะอาหารในโรงเรียนสังกัด อบจ.',
    areaLabel: 'เมืองภูเก็ต',
    lon: 98.3900, lat: 7.8850,
    color: '#8b5cf6', icon: 'school',
    progressPct: 25,
    targetLabel: 'ลดขยะอาหาร', targetValue: '-30%',
    startDate: '5 พ.ค. 68', endDate: '10 มิ.ย. 68', daysRemaining: 56,
  },
  {
    id: 4,
    name: 'Compost Utilization Boost',
    description: 'เพิ่มการใช้ปุ๋ยหมักในพื้นที่เกษตร',
    areaLabel: 'เกาะสิเหร่',
    lon: 98.4300, lat: 7.8100,
    color: '#22c55e', icon: 'star',
    progressPct: 80,
    targetLabel: 'ใช้ปุ๋ยหมักเพิ่มขึ้น', targetValue: '+25%',
    startDate: '5 พ.ค. 68', endDate: '10 มิ.ย. 68', daysRemaining: 16,
  },
];

export interface MissionStats {
  total: number;
  inProgress: number;
  nearComplete: number;
  completed: number;
}

// Status is derived from progress, not stored, so the counters can never
// drift out of sync with the mission cards themselves.
export function getMissionStats(missions: Mission[]): MissionStats {
  const total = missions.length;
  const completed = missions.filter(m => m.progressPct >= 100).length;
  const nearComplete = missions.filter(m => m.progressPct >= 75 && m.progressPct < 100).length;
  const inProgress = total - completed;
  return { total, inProgress, nearComplete, completed };
}

export interface MissionTimelineEntry {
  time: string;
  missionId: number;
  label: string;
}

export const MISSION_TIMELINE: MissionTimelineEntry[] = [
  { time: '09:30', missionId: 1, label: 'ตรวจคุณภาพอินทรีย์ รอบเช้า' },
  { time: '10:15', missionId: 2, label: 'อบรมผู้ค้า ตลาดสดกลาง' },
  { time: '11:00', missionId: 3, label: 'เก็บข้อมูลขยะอาหาร โรงเรียนนำร่อง' },
  { time: '11:00', missionId: 4, label: 'ติดตามเกษตรกรผู้ใช้ปุ๋ย 5 แห่ง' },
  { time: '14:00', missionId: 4, label: 'ส่งมอบปุ๋ยหมักรอบที่ 2' },
];

export type MissionKpiIcon = 'leaf' | 'coin' | 'cloud' | 'piggy' | 'people';

export interface MissionKpi {
  key: string;
  label: string;
  value: string;
  trend: number[];
  color: string;
  icon: MissionKpiIcon;
}

export const MISSION_KPIS: MissionKpi[] = [
  { key: 'organic', label: 'Organic แยกเพิ่มขึ้น', value: '28.6%', trend: [18, 20, 22, 24, 26, 28.6], color: '#22c55e', icon: 'leaf' },
  { key: 'value', label: 'มูลค่าเพิ่ม/เดือน', value: '3.24 ลบ.', trend: [2.1, 2.4, 2.6, 2.9, 3.1, 3.24], color: '#eab308', icon: 'coin' },
  { key: 'co2', label: 'ลด CO2/เดือน', value: '39.5 ตัน', trend: [28, 30, 33, 35, 37, 39.5], color: '#22c55e', icon: 'cloud' },
  { key: 'saving', label: 'Cost Saving/เดือน', value: '1.85 ลบ.', trend: [1.1, 1.3, 1.4, 1.6, 1.7, 1.85], color: '#22c55e', icon: 'piggy' },
  { key: 'people', label: 'ประชาชนได้รับประโยชน์', value: '45,720 คน', trend: [30000, 34000, 38000, 41000, 43500, 45720], color: '#3b82f6', icon: 'people' },
];
