import {
  Activity,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSignature,
  Gavel,
  ListChecks,
  MapPinned,
  MessageSquare,
  PackageCheck,
  Scale,
  ShieldCheck,
  Target,
  TrendingDown,
} from "lucide-react";
import type { ComponentType } from "react";

export type StoryboardStepTone = "blue" | "green" | "amber" | "red" | "slate";

export type StoryboardStep = {
  id: string;
  title: string;
  time: string;
  icon: ComponentType<{ className?: string }>;
  tone: StoryboardStepTone;
  lines: string[];
  metrics?: { label: string; value: string; tone?: StoryboardStepTone }[];
};

export const trustPillars = [
  { title: "Evidence First", subtitle: "ข้อมูลจริงก่อนตัดสินใจ", icon: ShieldCheck },
  { title: "Explainable", subtitle: "อธิบายได้ โปร่งใส", icon: Scale },
  { title: "Impact Driven", subtitle: "มุ่งผลลัพธ์ที่วัดได้", icon: Target },
];

export const profile = {
  name: "คุณสมชาย วงศ์เจริญ",
  role: "General Manager",
  time: "08:30 น. 18 ก.ค. 2569",
};

export const storyboardSteps: StoryboardStep[] = [
  {
    id: "m01",
    title: "Welcome",
    time: "08:30",
    icon: Building2,
    tone: "blue",
    lines: ["สวัสดีครับ คุณสมชาย", "CityZen Organic Executive Advisor พร้อมเริ่ม briefing ประจำวัน"],
  },
  {
    id: "m02",
    title: "Organic Briefing Package",
    time: "08:31",
    icon: PackageCheck,
    tone: "blue",
    lines: ["แฟ้มสรุปประจำวัน", "รวบรวมจุดล้นถัง เรื่องด่วน และผลผลิตของโรงแรม"],
  },
  {
    id: "m03",
    title: "Executive Brief",
    time: "08:32",
    icon: BookOpen,
    tone: "red",
    lines: ["ปริมาณขยะอินทรีย์วันนี้ 524 kg", "สูงกว่าค่าเฉลี่ย 14% สาเหตุหลักจาก Breakfast Buffet"],
  },
  {
    id: "m04",
    title: "Evidence Package",
    time: "08:33",
    icon: ClipboardCheck,
    tone: "green",
    lines: ["รวบรวมจาก 14 แหล่งข้อมูล", "Evidence Completeness 96%"],
  },
  {
    id: "m05",
    title: "Understanding & Policy",
    time: "08:34",
    icon: MapPinned,
    tone: "amber",
    lines: ["แหล่งที่เกิดขยะอินทรีย์ (Risk Heatmap) และนโยบายที่เกี่ยวข้อง", "แนวโน้ม 7 วันย้อนหลังเพิ่มขึ้นต่อเนื่อง"],
  },
  {
    id: "m06",
    title: "Options for Consideration",
    time: "08:35",
    icon: ListChecks,
    tone: "blue",
    lines: ["แนวทางที่สามารถดำเนินการได้", "4 แนวทางพร้อมผลลัพธ์ที่คาดว่าจะได้รับ"],
  },
  {
    id: "m07",
    title: "Executive Judgment",
    time: "08:36",
    icon: Gavel,
    tone: "green",
    lines: ["การตัดสินใจของท่าน", "อนุมัติ มอบหมาย และแจ้งฝ่ายที่เกี่ยวข้อง"],
  },
  {
    id: "m08",
    title: "Draft Order Preview",
    time: "08:37",
    icon: FileSignature,
    tone: "slate",
    lines: ["คำสั่งภายในโรงแรม", "การจัดการเก็บขยะอินทรีย์เพิ่มเติม"],
  },
  {
    id: "m09",
    title: "Operations Execution",
    time: "08:38",
    icon: Activity,
    tone: "green",
    lines: ["การดำเนินงานแบบ Real-time", "ติดตามรอบเก็บและระดับการจัดเก็บ"],
  },
  {
    id: "m10",
    title: "Internal Communication",
    time: "08:39",
    icon: MessageSquare,
    tone: "blue",
    lines: ["ช่องทางการสื่อสารภายใน", "แจ้งเตือนผ่าน Line OA, Mobile App, Email และ Board"],
  },
  {
    id: "m11",
    title: "Outcome & Prediction",
    time: "08:40",
    icon: TrendingDown,
    tone: "green",
    lines: ["คาดการณ์ผลลัพธ์หากดำเนินงานตามแผน", "ลดปริมาณขยะและต้นทุนการจัดการ"],
  },
  {
    id: "m12",
    title: "End of Morning Brief",
    time: "08:41",
    icon: CheckCircle2,
    tone: "green",
    lines: ["สรุปข้อมูลประจำเช้าเสร็จสมบูรณ์", "พร้อมเข้าสู่ Workspace"],
  },
];
