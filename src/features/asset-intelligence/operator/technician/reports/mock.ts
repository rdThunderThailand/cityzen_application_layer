import { TechnicianReportData, TechnicianMaintenanceReportData, TechnicianCostReportData } from '../types';

export const getTechnicianReportData = async (): Promise<TechnicianReportData> => {
  return {
    metrics: {
      totalWorkOrders: 128,
      totalWorkOrdersTrend: 'เพิ่มขึ้น 12% จากเดือนที่แล้ว',
      completed: 122,
      completedPercent: 'คิดเป็น 95.3%',
      inProgress: 6,
      inProgressTrend: 'ลดลง 20% จากเดือนที่แล้ว',
      delayed: 2,
      delayedTrend: 'เพิ่มขึ้น 2 ใบงาน',
      totalCost: 85450.00,
      totalCostTrend: 'ลดลง 8% จากเดือนที่แล้ว',
    },
    workOrdersChart: [
      { date: '1 พ.ค.', total: 20, completed: 15 },
      { date: '6 พ.ค.', total: 35, completed: 25 },
      { date: '11 พ.ค.', total: 45, completed: 35 },
      { date: '16 พ.ค.', total: 55, completed: 42 },
      { date: '21 พ.ค.', total: 75, completed: 60 },
      { date: '26 พ.ค.', total: 95, completed: 80 },
      { date: '31 พ.ค.', total: 128, completed: 122 },
    ],
    jobTypeChart: [
      { name: 'ซ่อมฉุกเฉิน', value: 45, color: '#2563eb', count: 58 },
      { name: 'บำรุงรักษาตามแผน (PM)', value: 30, color: '#10b981', count: 38 },
      { name: 'ปรับปรุง/ติดตั้ง', value: 15, color: '#f59e0b', count: 19 },
      { name: 'ตรวจสอบ', value: 10, color: '#a855f7', count: 13 },
    ],
    costChart: [
      { month: 'ม.ค.', cost: 50000, isCurrent: false },
      { month: 'ก.พ.', cost: 68000, isCurrent: false },
      { month: 'มี.ค.', cost: 58000, isCurrent: false },
      { month: 'เม.ย.', cost: 70000, isCurrent: false },
      { month: 'พ.ค.', cost: 85450, isCurrent: true },
    ],
    topEquipment: [
      { id: 1, name: 'เครื่องปรับอากาศ แบบแขวน', count: 24, image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop' },
      { id: 2, name: 'ปั๊มน้ำ', count: 18, image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=150&h=150&fit=crop' },
      { id: 3, name: 'ระบบไฟฟ้าแสงสว่าง', count: 15, image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?w=150&h=150&fit=crop' },
    ],
    topLocations: [
      { id: 1, name: 'อาคารสำนักงาน ชั้น 2', count: 28 },
      { id: 2, name: 'อาคาร A ชั้น 1', count: 21 },
    ],
    costsByJobType: [
      { type: 'ซ่อมฉุกเฉิน', cost: 40250.00, percent: '47.1%' },
      { type: 'บำรุงรักษาตามแผน (PM)', cost: 25300.00, percent: '29.6%' },
    ],
    popularReports: [
      'รายงานสรุปภาพรวม',
      'รายงานการซ่อมบำรุง',
      'รายงานค่าใช้จ่าย',
    ],
    recentDownloads: [
      { title: 'รายงานสรุปภาพรวม_พ.ค.2567.pdf', date: '31 พ.ค. 2567 14:25 น.', type: 'PDF' },
    ],
  };
};

export const getTechnicianMaintenanceReportData = async (): Promise<TechnicianMaintenanceReportData> => {
  return {
    metrics: {
      totalJobs: 122,
      totalJobsTrend: 'เพิ่มขึ้น 12% จากเดือนที่แล้ว',
      completed: 108,
      completedPercent: 'คิดเป็น 88.5%',
      inProgress: 6,
      inProgressTrend: 'ลดลง 20% จากเดือนที่แล้ว',
      canceled: 8,
      canceledTrend: 'เพิ่มขึ้น 14% จากเดือนที่แล้ว',
      totalCost: 85450.00,
      totalCostTrend: 'ลดลง 8% จากเดือนที่แล้ว',
    },
    trendChart: [
      { month: 'ม.ค.', jobs: 50, cost: 25000 },
      { month: 'ก.พ.', jobs: 70, cost: 40000 },
      { month: 'มี.ค.', jobs: 85, cost: 30000 },
      { month: 'เม.ย.', jobs: 90, cost: 45000 },
      { month: 'พ.ค.', jobs: 122, cost: 85450 },
    ],
    typeDonutChart: [
      { name: 'เชิงป้องกัน (PM)', value: 48, color: '#2563eb', count: 48, percent: '39.3%' },
      { name: 'เชิงแก้ไข (CM)', value: 52, color: '#10b981', count: 52, percent: '42.6%' },
    ],
    costByJobTypeChart: [
      { type: 'เชิงป้องกัน (PM)', cost: 25300 },
      { type: 'เชิงแก้ไข (CM)', cost: 41200 },
    ],
    latestMaintenance: [
      { workOrderId: 'WO-6705-00123', equipmentName: 'เครื่องปรับอากาศ แบบแขวน', equipmentSubtext: 'อาคารสำนักงาน ชั้น 2 ห้อง 201', jobType: 'เชิงแก้ไข (CM)', location: 'อาคารสำนักงาน', locationSubtext: 'ชั้น 2', startDate: '20 พ.ค. 2567', startTime: '09:15', status: 'เสร็จสิ้น', operatorName: 'สมชาย ช.', cost: 1850.00, image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop', operatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    ],
    topEquipment: [
      { id: 1, name: 'เครื่องปรับอากาศ แบบแขวน', count: 24, image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop' },
    ],
    averageCost: {
      value: 700.41,
      trend: 'ลดลง 6% จากเดือนที่แล้ว',
    },
  };
};

export const getTechnicianCostReportData = async (): Promise<TechnicianCostReportData> => {
  return {
    metrics: {
      totalCost: 85450.00,
      totalCostTrend: 'ลดลง 8% จากเดือนที่แล้ว',
      maintenanceCost: 40250.00,
      maintenanceCostTrend: 'ลดลง 6% จากเดือนที่แล้ว',
      partsCost: 25300.00,
      partsCostTrend: 'เพิ่มขึ้น 12% จากเดือนที่แล้ว',
      otherCost: 7100.00,
      otherCostTrend: 'ลดลง 5% จากเดือนที่แล้ว',
      dailyAverage: 2756.45,
      dailyAverageTrend: 'ลดลง 8% จากเดือนที่แล้ว',
    },
    trendChart: [
      { month: 'ม.ค.', cost: 50000 },
      { month: 'ก.พ.', cost: 68000 },
      { month: 'มี.ค.', cost: 58000 },
      { month: 'เม.ย.', cost: 70000 },
      { month: 'พ.ค.', cost: 85450, active: true },
    ],
    typeDonutChart: [
      { name: 'ค่าซ่อมบำรุง', value: 40250.00, color: '#2563eb', percent: '47.1%' },
      { name: 'ค่าอะไหล่', value: 25300.00, color: '#10b981', percent: '29.6%' },
    ],
    comparisonChart: [
      { category: 'ค่าซ่อมบำรุง', prevMonth: 42000, currMonth: 40250 },
      { category: 'ค่าอะไหล่', prevMonth: 22000, currMonth: 25300 },
    ],
    categoryDonutChart: [
      { name: 'ซ่อมแซม', value: 32800, color: '#2563eb', percent: '38.4%' },
      { name: 'อะไหล่', value: 23850, color: '#10b981', percent: '27.9%' },
    ],
    summary: {
      budget: 100000.00,
      total: 85450.00,
      remaining: 14550.00,
      percentUsed: 85.45,
    },
    topCosts: [
      { id: 1, name: 'ซ่อมแอร์ อาคารสำนักงาน ชั้น 2', cost: 5200.00 },
      { id: 2, name: 'เปลี่ยนคอมเพรสเซอร์แอร์ อาคาร A', cost: 4800.00 },
    ],
    costList: [
      { id: 'EXP-6705-0156', date: '20 พ.ค. 2567', costType: 'ค่าซ่อมบำรุง', category: 'ซ่อมแซม', details: 'ซ่อมแอร์ อาคารสำนักงาน ชั้น 2', location: 'อาคารสำนักงาน ชั้น 2', vendor: 'บริษัท คูลแอร์ จำกัด', amount: 1850.00, status: 'อนุมัติแล้ว' },
      { id: 'EXP-6705-0155', date: '19 พ.ค. 2567', costType: 'ค่าอะไหล่', category: 'อะไหล่แอร์', details: 'คอมเพรสเซอร์แอร์ 24,000 BTU', location: 'อาคาร A ชั้น 1', vendor: 'บริษัท แอร์โปร จำกัด', amount: 5200.00, status: 'อนุมัติแล้ว' },
    ],
  };
};
