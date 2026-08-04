export type InspectionOrderStatus =
  | "accepted"
  | "traveling"
  | "arrived"
  | "in_progress"
  | "summary"
  | "submitted"
  | "pending_approval"
  | "closed";

export const INSPECTION_ORDER_STATUS_ORDER: InspectionOrderStatus[] = [
  "accepted",
  "traveling",
  "arrived",
  "in_progress",
  "summary",
  "submitted",
  "pending_approval",
  "closed",
];

export const STATUS_LABELS: Record<InspectionOrderStatus, string> = {
  accepted: "รับงานแล้ว",
  traveling: "กำลังเดินทาง",
  arrived: "ถึงหน้างานแล้ว",
  in_progress: "กำลังดำเนินการ",
  summary: "สรุปผลและหลักฐาน",
  submitted: "ส่งตรวจรับ",
  pending_approval: "รอตรวจรับ",
  closed: "งานปิดแล้ว",
};

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  result: "normal" | "issue" | "pending";
}

export interface MeasurementReading {
  id: string;
  name: string;
  normalRange: string;
  measuredValue: string;
  result: "normal" | "high" | "low";
}

export interface EvidenceItem {
  id: string;
  url: string;
  title: string;
  capturedAt: string;
  step: InspectionOrderStatus;
  kind: "photo" | "file";
  grayscale?: boolean;
}

export interface PartLineItem {
  id: string;
  code: string;
  name: string;
  description: string;
  unit: string;
  qty: number;
  unitPrice: number;
}

export interface CostLineItem {
  id: string;
  type: string;
  description: string;
  provider: string;
  amount: number;
  documentName: string;
  documentType: "pdf" | "image";
}

export interface DocumentItem {
  id: string;
  fileType: string;
  name: string;
  subtitle: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  sizeLabel: string;
}

export interface TimelineEntry {
  status: InspectionOrderStatus;
  label: string;
  at: string;
  actorName?: string;
  detail?: string;
}

export type RouteCoordinate = [lng: number, lat: number];

export interface InspectionOrder {
  id: string;
  woNumber: string;
  status: InspectionOrderStatus;

  assetName: string;
  assetLocation: string;
  location: string;
  addressLine: string;

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

  technician: ContactInfo;
  approver: ContactInfo;

  siteCoordinates: RouteCoordinate;
  route: RouteCoordinate[];
  distanceKm: number;
  travelMinutes: number;
  departedAt: string;
  arrivedAt: string;

  checklist: ChecklistItem[];
  measurements: MeasurementReading[];
  evidence: EvidenceItem[];
  parts: PartLineItem[];
  costs: CostLineItem[];
  documents: DocumentItem[];
  timeline: TimelineEntry[];

  rootCause: string;
  resolution: string;
  resultMetrics: { label: string; value: string }[];
  startedAt: string;
  completedAt: string;
  approvalNote: string;
  approvedAt: string;
}

export type InspectionOrderPatch = Partial<Omit<InspectionOrder, "id" | "woNumber" | "status" | "timeline">>;
