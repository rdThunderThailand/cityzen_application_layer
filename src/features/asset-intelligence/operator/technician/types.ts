export interface TechnicianSummaryStats {
  tasksToday: number;
  urgentTasks: number;
  overdueTasks: number;
  completedThisWeek: number;
  hoursWorked: number;
  maxHours: number;
  progressPercent: number;
}


export interface TechnicianTaskItem {
  id: string;
  time: string;
  isUrgent: boolean;
  title: string;
  location: string;
  assetId: string;
  status: string;
  statusColor: string;
  statusBg: string;
  imgUrl: string;
}


export interface TechnicianMaintenanceOverview {
  total: number;
  items: {
    label: string;
    count: number;
    percent: string;
    color: string;
  }[];
}


export interface TechnicianMapLocation {
  id: string;
  number: number;
  lat: number;
  lng: number;
  color: string;
}


export interface TechnicianPreWorkChecklist {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  isChecked: boolean;
}


export interface TechnicianPMPlan {
  id: string;
  dateStr: string;
  title: string;
  subtitle: string;
  relativeDays: string;
  relativeColor: string;
}


export interface TechnicianNotification {
  id: string;
  type: "danger" | "info" | "success";
  title: string;
  subtitle: string;
  timeAgo: string;
}


export interface TechnicianToolsAndSpares {
  toolCount: number;
  inventoryCount: number;
}


export interface TechnicianMyTaskStats {
  all: number;
  pending: number;
  inProgress: number;
  waiting: number;
  overdue: number;
  completedToday: number;
}


export interface TechnicianMyTaskItem {
  id: string;
  woNumber: string;
  createdDate: string; // e.g. "สร้างเมื่อ 20 พ.ค. 2567"
  taskType: string; // e.g. "แจ้งซ่อม", "บำรุงรักษา (PM)", "ตรวจสอบ"
  taskIcon: string;
  taskIconColor: string;
  taskIconBg: string;
  assetName: string; // e.g. "เครื่องปรับอากาศ แบบแขวน"
  location: string; // e.g. "อาคารสำนักงานชั้น 2"
  reporterName: string; // e.g. "น.ส. กานต์พิชชา"
  reporterDept: string; // e.g. "กองคลัง"
  priority: string; // "ต่ำ", "ปานกลาง", "สูง"
  priorityColor: string; // "text-emerald-600 bg-emerald-50", etc
  dueDate: string; // "21 พ.ค. 2567"
  dueTime: string; // "17:00 น."
  overdueText?: string; // "เกินกำหนด 1 วัน"
  status: string; // "รอดำเนินการ", "กำลังดำเนินการ", etc.
  statusColor: string;
  statusBg: string;
  actionText: string; // "เริ่มงาน", "ดำเนินการต่อ", "ดูรายละเอียด", "ดูประวัติ"
}


export interface TechnicianAllWOStats {
  all: number;
  pending: number;
  inProgress: number;
  waiting: number;
  completed: number;
  canceled: number;
}


export interface TechnicianAllWOItem {
  id: string;
  woNumber: string;
  createdDate: string; // e.g. "สร้างเมื่อ 20 พ.ค. 2567"
  taskType: string;
  taskIcon: string;
  taskIconColor: string;
  taskIconBg: string;
  assetName: string;
  location: string;
  reporterName: string;
  reporterDept: string;
  priority: string;
  priorityColor: string;
  dueDate: string;
  dueTime: string;
  createdDateOnly: string;
  createdTimeOnly: string;
  assigneeName: string;
  status: string;
  statusColor: string;
  statusBg: string;
  actionText: string;
}


export interface TechnicianPMPlanStats {
  all: number;
  active: { count: number; percent: number };
  nearingDue: { count: number; label: string };
  overdue: { count: number; label: string };
  suspended: { count: number; percent: number };
}


export interface TechnicianPMPlanItem {
  id: string;
  code: string;
  name: string;
  assetName: string;
  location: string;
  frequency: string;
  nextCycleDate: string;
  nextCycleRemaining: string;
  nextCycleColor: string;
  assigneeName: string;
  status: string;
  statusColor: string;
  statusBg: string;
  actionText: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}


export interface TechnicianPMFreqSummary {
  monthly: { count: number; percent: string };
  quarterly: { count: number; percent: string };
  halfYearly: { count: number; percent: string };
  yearly: { count: number; percent: string };
}


export interface TechnicianInspectionStats {
  pending: number;
  inspecting: number;
  inspected: number;
  issueFound: number;
  canceled: number;
}


export interface TechnicianInspectionItem {
  id: string;
  woNumber: string;
  woDate: string;
  assetName: string;
  assetLocation: string;
  location: string;
  reporterName: string;
  reporterDept: string;
  status: string;
  statusBg: string;
  statusColor: string;
  priority: string;
  priorityColor: string;
  appointmentDate: string;
  appointmentTime: string;
  dueDate: string;
  dueTime: string;
  actionText: string;
}


export interface TechnicianInspectionDetail {
  id: string;
  woNumber: string;
  status: string;
  statusBg: string;
  statusColor: string;
  assetName: string;
  assetLocation: string;
  location: string;
  reporterName: string;
  reporterDept: string;
  reporterPhone: string;
  woDate: string;
  dueDate: string;
  priority: string;
  priorityColor: string;
  assignerName: string;
  assignerDept: string;
  taskType: string;
  notes: string;
  notesDate: string;
  progressPercent: number;
}


export interface TechnicianRequestItem {
  id: string;
  asset: string;
  location: string;
  reporter: string;
  urgency: string;
  status: string;
  date: string;
  dueDate: string;
  dateTop: string;
  dateBottom: string;
  dueTop: string;
  dueBottom: string;
  iconBg: string;
  type: string;
  image?: string;
}


export interface TechnicianInventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  warehouse: string;
  stockRem: number;
  stockMin: number;
  unitValue: number;
  totalValue: number;
  status: string;
  image?: string;
}


export interface TechnicianToolItem {
  id: string;
  name: string;
  enName: string;
  category: string;
  brandModel: string;
  serialNumber: string;
  status: string;
  location: string;
  calibrationDate: string;
  calibrationStatusText: string;
  isOverdue: boolean;
  image?: string;
}


export interface TechnicianHistoryItem {
  workOrderId: string;
  equipmentName: string;
  equipmentSubtext: string;
  location: string;
  locationSubtext: string;
  jobType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  operatorName: string;
  operatorRole: string;
  status: string;
  cost: number;
  rating: number; // 0-5
  image?: string;
  operatorAvatar?: string;
}


export interface TechnicianDocumentItem {
  documentName: string;
  documentSubtext: string;
  category: string;
  equipment: string;
  equipmentSubtext: string;
  fileType: string;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
  fileSize: string;
}


export interface TechnicianReportData {
  metrics: {
    totalWorkOrders: number;
    totalWorkOrdersTrend: string;
    completed: number;
    completedPercent: string;
    inProgress: number;
    inProgressTrend: string;
    delayed: number;
    delayedTrend: string;
    totalCost: number;
    totalCostTrend: string;
  };
  workOrdersChart: { date: string; total: number; completed: number }[];
  jobTypeChart: { name: string; value: number; color: string; count: number }[];
  costChart: { month: string; cost: number; isCurrent: boolean }[];
  topEquipment: { id: number; name: string; count: number; image?: string }[];
  topLocations: { id: number; name: string; count: number }[];
  costsByJobType: { type: string; cost: number; percent: string }[];
  popularReports: string[];
  recentDownloads: { title: string; date: string; type: string }[];
}


export interface TechnicianMaintenanceReportData {
  metrics: {
    totalJobs: number;
    totalJobsTrend: string;
    completed: number;
    completedPercent: string;
    inProgress: number;
    inProgressTrend: string;
    canceled: number;
    canceledTrend: string;
    totalCost: number;
    totalCostTrend: string;
  };
  trendChart: { month: string; jobs: number; cost: number }[];
  typeDonutChart: { name: string; value: number; color: string; count: number; percent: string }[];
  costByJobTypeChart: { type: string; cost: number }[];
  latestMaintenance: {
    workOrderId: string;
    equipmentName: string;
    equipmentSubtext: string;
    jobType: string;
    location: string;
    locationSubtext: string;
    startDate: string;
    startTime: string;
    status: string;
    operatorName: string;
    operatorAvatar?: string;
    cost: number;
    image?: string;
  }[];
  topEquipment: { id: number; name: string; count: number; image?: string }[];
  averageCost: {
    value: number;
    trend: string;
  };
}


export interface TechnicianCostReportData {
  metrics: {
    totalCost: number;
    totalCostTrend: string;
    maintenanceCost: number;
    maintenanceCostTrend: string;
    partsCost: number;
    partsCostTrend: string;
    otherCost: number;
    otherCostTrend: string;
    dailyAverage: number;
    dailyAverageTrend: string;
  };
  trendChart: { month: string; cost: number; active?: boolean }[];
  typeDonutChart: { name: string; value: number; color: string; percent: string }[];
  comparisonChart: { category: string; prevMonth: number; currMonth: number }[];
  categoryDonutChart: { name: string; value: number; color: string; percent: string }[];
  summary: {
    budget: number;
    total: number;
    remaining: number;
    percentUsed: number;
  };
  topCosts: { id: number; name: string; cost: number }[];
  costList: {
    id: string; // เลขที่เอกสาร
    date: string;
    costType: string;
    category: string;
    details: string;
    location: string;
    vendor: string;
    amount: number;
    status: string;
  }[];
}


export interface TechnicianSettingsData {
  mainSettings: {
    id: string;
    title: string;
    description: string;
    icon: string; // We'll map this string to a Lucide icon component in the UI
    colorClass: string;
    bgClass: string;
  }[];
  generalConfig: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    currency: string;
    themeColor: string;
    defaultPage: string;
    itemsPerPage: string;
  };
  recentActivities: {
    id: string;
    action: string;
    user: string;
    date: string;
    time: string;
    icon: string;
    iconColor: string;
    iconBg: string;
  }[];
  systemInfo: {
    version: string;
    database: string;
    storageUsed: number;
    storageTotal: number;
    storageUnit: string;
    lastBackup: string;
    lastUpdate: string;
  };
}

