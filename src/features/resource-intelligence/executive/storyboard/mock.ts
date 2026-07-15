import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck2,
  FileText,
  Gavel,
  HeartPulse,
  Landmark,
  Megaphone,
  PackageCheck,
  Workflow,
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
  { title: "Evidence First", subtitle: "ข้อมูลจริงก่อนตัดสินใจ", icon: FileCheck2 },
  { title: "Explainable", subtitle: "อธิบายได้ โปร่งใส", icon: Eye },
  { title: "Traceable", subtitle: "ตรวจสอบย้อนหลังได้", icon: Activity },
];

export const profile = {
  name: "ผู้ว่าราชการจังหวัดภูเก็ต",
  role: "Governor",
  time: "08:30 น. 18 ก.ค. 2569",
};

export const storyboardSteps: StoryboardStep[] = [
  {
    id: "01",
    title: "Welcome",
    time: "08:30",
    icon: Building2,
    tone: "blue",
    lines: ["สวัสดีครับท่านผู้ว่า", "CityZen Executive Office พร้อมเริ่ม briefing ประจำวัน"],
  },
  {
    id: "02",
    title: "Executive Briefing Package",
    time: "08:31",
    icon: PackageCheck,
    tone: "blue",
    lines: ["แฟ้มสรุปประจำวัน", "รวบรวมข้อมูลสำคัญจากหน่วยงานและพื้นที่เสี่ยง"],
    metrics: [
      { label: "เรื่องด่วน", value: "3", tone: "red" },
      { label: "รอตัดสินใจ", value: "5", tone: "blue" },
      { label: "เสร็จสมบูรณ์", value: "12", tone: "green" },
      { label: "ร้องเรียน", value: "18", tone: "amber" },
    ],
  },
  {
    id: "03",
    title: "Executive Brief",
    time: "08:32",
    icon: BookOpen,
    tone: "red",
    lines: ["สถานการณ์ขยะสะสมในพื้นที่ท่องเที่ยว", "ระดับผลกระทบสูง ต้องพิจารณาภายในวันนี้"],
    metrics: [
      { label: "ปริมาณสะสม", value: "286.5" },
      { label: "เทียบวานนี้", value: "18%" },
      { label: "แนวโน้ม", value: "+24%" },
    ],
  },
  {
    id: "04",
    title: "Evidence Package",
    time: "08:33",
    icon: ClipboardCheck,
    tone: "green",
    lines: ["รวมรายงาน 14 หน่วยงาน 112 แหล่งข้อมูล", "Data integrity complete"],
    metrics: [{ label: "Verified", value: "96%", tone: "green" }],
  },
  {
    id: "05",
    title: "Understanding & Legal Basis",
    time: "08:34",
    icon: HeartPulse,
    tone: "amber",
    lines: [
      "แผนที่ความเสี่ยงและแนวโน้ม 7 วันข้างหน้า",
      "พื้นที่สีแดงต้องเฝ้าระวังทันที",
      "พ.ร.บ.สาธารณสุข พ.ศ. 2535",
      "ระเบียบกระทรวงมหาดไทย",
      "หนังสือสั่งการ มท 0808.2/ว 1234",
    ],
  },
  {
    id: "06",
    title: "Options for Consideration",
    time: "08:36",
    icon: BriefcaseBusiness,
    tone: "green",
    lines: ["Option A: เพิ่มจุดทิ้งชั่วคราว", "Option B: ขอสนับสนุนรถเก็บขน", "Option C: ประกาศมาตรการพื้นที่ควบคุม"],
  },
  {
    id: "07",
    title: "Executive Judgment",
    time: "08:37",
    icon: Gavel,
    tone: "blue",
    lines: ["ข้อมูลเพิ่มเติม", "เรียกประชุม War Room", "มอบหมายหน่วยงานประจำพื้นที่", "ร่างคำสั่ง"],
  },
  {
    id: "08",
    title: "Draft Order Preview",
    time: "08:38",
    icon: FileText,
    tone: "green",
    lines: ["ลงนามคำสั่ง", "เอกสารพร้อมส่งต่อหน่วยปฏิบัติ"],
  },
  {
    id: "09",
    title: "Public Communication",
    time: "08:40",
    icon: Megaphone,
    tone: "blue",
    lines: ["ประกาศผ่าน Line OA, Website, Facebook", "ข้อความสั้นพร้อมส่งให้ประชาชน"],
  },
  {
    id: "10",
    title: "Outcome & Prediction",
    time: "08:41",
    icon: BarChart3,
    tone: "green",
    lines: ["ปริมาณขยะ -18%", "เรื่องร้องเรียน -32%", "ความพึงพอใจ +24%"],
  },
  {
    id: "11",
    title: "End of Morning Brief",
    time: "08:42",
    icon: Landmark,
    tone: "slate",
    lines: ["การสรุปข้อมูลประจำวันเสร็จสมบูรณ์", "พร้อมเข้าสู่ Executive Workspace"],
  },
];

export const flowIcons = [Workflow, CheckCircle2, FileCheck2];
