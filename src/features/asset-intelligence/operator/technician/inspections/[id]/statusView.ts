import { INSPECTION_ORDER_STATUS_ORDER, InspectionOrderStatus } from "./types";

export type ViewState =
  | "default"
  | "navigating"
  | "arrived"
  | "in_progress"
  | "summary"
  | "summary_parts"
  | "summary_costs"
  | "summary_docs"
  | "send_approval"
  | "pending_acceptance"
  | "closed";

const STATUS_TO_VIEW: Record<InspectionOrderStatus, ViewState> = {
  accepted: "default",
  traveling: "navigating",
  arrived: "arrived",
  in_progress: "in_progress",
  summary: "summary",
  submitted: "send_approval",
  pending_approval: "pending_acceptance",
  closed: "closed",
};

export function viewStateForStatus(status: InspectionOrderStatus): ViewState {
  return STATUS_TO_VIEW[status];
}

export type StepVisualState = "completed" | "active" | "pending";

export function getStepVisualState(stepStatus: InspectionOrderStatus, currentStatus: InspectionOrderStatus): StepVisualState {
  const stepIndex = INSPECTION_ORDER_STATUS_ORDER.indexOf(stepStatus);
  const currentIndex = INSPECTION_ORDER_STATUS_ORDER.indexOf(currentStatus);
  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}

export function getProgressPercent(status: InspectionOrderStatus): number {
  const currentIndex = INSPECTION_ORDER_STATUS_ORDER.indexOf(status);
  return Math.round(((currentIndex + 1) / INSPECTION_ORDER_STATUS_ORDER.length) * 100);
}

const STATUS_BADGE_CLASS: Record<InspectionOrderStatus, string> = {
  accepted: "bg-emerald-50 text-emerald-700",
  traveling: "bg-blue-50 text-blue-600",
  arrived: "bg-blue-50 text-blue-600",
  in_progress: "bg-amber-50 text-amber-600",
  summary: "bg-amber-50 text-amber-600",
  submitted: "bg-blue-50 text-blue-600",
  pending_approval: "bg-orange-50 text-orange-600",
  closed: "bg-emerald-100 text-emerald-700",
};

export function getStatusBadgeClass(status: InspectionOrderStatus): string {
  return STATUS_BADGE_CLASS[status];
}
