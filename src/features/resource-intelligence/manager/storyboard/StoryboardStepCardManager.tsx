import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  Handshake,
  Mail,
  MessageCircle,
  QrCode,
  Scale,
  Send,
  Smartphone,
  Target,
  UserCog,
  FileText,
  Landmark,
} from "lucide-react";
import { cn } from "@/utils/cn";
import logo from "../../../../../public/logo.png";
import type { StoryboardStep, StoryboardStepTone } from "./mock";
import { StoryboardTrendChart } from "./StoryboardTrendChart";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

const metricToneClasses: Record<StoryboardStepTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-700",
  slate: "bg-slate-50 text-slate-700",
};

const cardShell = "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";

export function StoryboardStepCardManager({ step }: { step: StoryboardStep }) {
  const Icon = step.icon;

  if (step.id === "m01") {
    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-10 py-10 text-center">
          <Image src={logo} alt="CityZen Organic Executive Advisor" className="h-20 w-auto object-contain" loading="eager" />
          <div className="-mt-4 leading-none">
            <p className="text-6xl font-extrabold tracking-normal text-slate-700">CITYZEN ORGANIC</p>
            <p className="mt-2 text-xl font-medium text-slate-700">Executive Advisor</p>
          </div>
          <div className="relative h-70 w-[32rem] max-w-full overflow-hidden">
            <Image src="/mockPic.png" alt="โรงแรม" fill className="object-contain" />
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-900">สวัสดีครับ คุณสมชาย</p>
            <div className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
              <p>CityZen Organic Executive Advisor</p>
              <p>ได้จัดเตรียมข้อมูลประกอบการบริหารจัดการขยะอินทรีย์ของโรงแรมเรียบร้อยแล้ว</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m02") {
    const stats = [
      { label: "จุดล้นถัง", value: "3", unit: "จุด", color: "red" },
      { label: "เรื่องด่วน", value: "4", unit: "เรื่อง", color: "blue" },
      { label: "Pickup", value: "2", unit: "รายการ", color: "slate" },
      { label: "ผลผลิต", value: "+12%", unit: "ดีขึ้น", color: "green" },
    ];

    const folderClasses: Record<string, { wrap: string; tab: string; text: string }> = {
      red: { wrap: "bg-yellow-50 text-yellow-600", tab: "bg-yellow-500", text: "text-yellow-600" },
      blue: { wrap: "bg-rose-50 text-rose-600", tab: "bg-rose-500", text: "text-rose-600" },
      slate: { wrap: "bg-slate-100 text-slate-600", tab: "bg-slate-500", text: "text-slate-600" },
      green: { wrap: "bg-emerald-50 text-emerald-600", tab: "bg-emerald-500", text: "text-emerald-600" },
    };

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col justify-between overflow-hidden p-40">
          <h4 className="text-4xl font-extrabold text-slate-900">แฟ้มสรุปประจำวัน</h4>
          <div className="mt-8 grid grid-cols-4 gap-6 px-21">
            {stats.map((stat) => {
              const color = folderClasses[stat.color];
              return (
                <Link href="/resource-intelligence/manager/storyboard/3"
                  key={stat.label}
                  className={cn(
                    "relative flex h-52 flex-col items-center justify-center rounded-b-2xl rounded-tr-xl px-3 pt-5 text-center shadow-sm transition-transform duration-150 hover:-translate-y-5",
                    color.wrap
                  )}
                >
                  <span className={cn("absolute left-4 top-0 h-2.5 w-16 -translate-y-1 rounded-t-md", color.tab)} />
                  <p className="text-xl font-bold leading-6">{stat.label}</p>
                  <p className={cn("text-7xl font-extrabold leading-tight", color.text)}>{stat.value}</p>
                  <p className="text-base leading-5 opacity-80">{stat.unit}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <p className="text-2xl font-bold leading-8 text-slate-800">Executive Summary</p>
            <p className="mt-2 text-xl leading-8 text-slate-500">
              ปริมาณขยะอินทรีย์สูงกว่าค่าเฉลี่ย 14% สาเหตุหลักจาก Breakfast Buffet และ Kitchen B ควรพิจารณาเพิ่มรอบเก็บขยะ
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m03") {
    const trendLabels = ["1", "2", "3", "4", "5", "6", "7"];
    const trendGridLines = [60, 130, 200];
    const trendPoints = [
      { x: 20, y: 175, waste: 470 },
      { x: 130, y: 165, waste: 455 },
      { x: 240, y: 150, waste: 480 },
      { x: 350, y: 155, waste: 465 },
      { x: 460, y: 120, waste: 505 },
      { x: 570, y: 90, waste: 515 },
      { x: 680, y: 60, waste: 524 },
    ];
    const trendLinePath =
      "M20 175 C56.7 175 93.3 165 130 165 C166.7 165 203.3 150 240 150 C276.7 150 313.3 155 350 155 C386.7 155 423.3 120 460 120 C496.7 120 533.3 90 570 90 C606.7 90 643.3 60 680 60";
    const causes = ["Breakfast Buffet", "Kitchen B (Main Kitchen)", "Banquet Hall"];
    const metrics = [
      { label: "ค่าเฉลี่ย 7 วัน", value: "460 kg" },
      { label: "แนวโน้ม", value: "เพิ่มขึ้น ↑" },
      { label: "เทียบกับเมื่อวาน", value: "+64 kg" },
      { label: "คาดการณ์พรุ่งนี้", value: "580 kg" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-col overflow-hidden px-70 py-40">
          <div className="flex items-start justify-between gap-10">
            <div className="min-w-0">
              <p className="text-xl font-medium text-slate-500">วันนี้ปริมาณขยะอินทรีย์</p>
              <div className="mt-2 flex items-baseline gap-4">
                <h4 className="text-6xl font-extrabold leading-tight text-slate-900">524 kg</h4>
                <span className="rounded-lg bg-rose-50 px-3 py-1 text-lg font-extrabold text-rose-600">สูงกว่าค่าเฉลี่ย 14%</span>
              </div>
              <div className="">
                <p className="mt-8 text-2xl font-bold text-slate-500">สาเหตุหลัก</p>
                <div className="mt-3 space-y-3">
                  {causes.map((cause, index) => (
                    <p key={cause} className="text-xl leading-8 text-slate-500">
                      {index + 1}. {cause}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative h-62 w-165 shrink-0 rounded-xl border border-slate-100 bg-slate-50/60 px-3 pt-3">
              <StoryboardTrendChart
                trendPoints={trendPoints}
                trendLabels={trendLabels}
                trendGridLines={trendGridLines}
                trendLinePath={trendLinePath}
              />
            </div>
          </div>

          <div className="mt-auto flex justify-between gap-6 pt-25">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="text-lg font-medium text-slate-500">{metric.label}</p>
                <p className="text-4xl font-extrabold leading-tight text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m04") {
    const sources = [
      { label: "QR Generator Scan", icon: QrCode },
      { label: "Weight Record", icon: Scale },
      { label: "Staff Input", icon: ClipboardList },
    ];
    const validations = ["Data Verified", "Time Stamped", "Source Traced"];

    return (
      <article className={cardShell}>
        <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] items-center gap-26 overflow-hidden px-90 py-20">
          <div className="min-w-0">
            <h4 className="text-4xl font-extrabold leading-tight text-slate-900">รวบรวมจาก</h4>
            <h4 className="text-4xl font-medium leading-tight text-slate-900">
              <span className="font-bold text-blue-700">14</span> แหล่งข้อมูล
            </h4>
            <div className="mt-8 space-y-5">
              {sources.map((source) => {
                const SourceIcon = source.icon;
                return (
                  <div key={source.label} className="flex items-center gap-4 text-xl leading-8 text-slate-500">
                    <SourceIcon className="h-6 w-6 shrink-0 text-blue-700" />
                    <span>{source.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center bg-slate-50 p-14 rounded-xl border border-slate-200 shadow-md hover:-translate-y-5 hover:shadow-xl transition-transform duration-150">
            <div className="grid h-56 w-56 place-items-center rounded-full bg-[conic-gradient(#22b15f_0_96%,#dbeafe_96%_100%)]">
              <div className="grid h-40 w-40 place-items-center rounded-full bg-blue-50">
                <span className="text-6xl font-extrabold text-blue-800">96%</span>
              </div>
            </div>
            <p className="mt-4 text-center text-lg text-slate-500">Evidence Completeness</p>
            <div className="mt-5 w-full space-y-3">
              {validations.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="h-6 w-6 shrink-0 stroke-[4] text-blue-800" />
                  <p className="text-lg leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m05") {
    const riskLevels = [
      { label: "วิกฤต", color: "bg-red-500" },
      { label: "เสี่ยงสูง", color: "bg-orange-500" },
      { label: "เฝ้าระวัง", color: "bg-amber-500" },
      { label: "ต่ำ", color: "bg-emerald-500" },
    ];
    const trendLabels = ["2 พ.ค.", "3 พ.ค.", "4 พ.ค.", "5 พ.ค.", "6 พ.ค.", "7 พ.ค.", "8 พ.ค."];
    const trendGridLines = [60, 130, 200];
    const trendPoints = [
      { x: 20, y: 170, waste: 236 },
      { x: 130, y: 155, waste: 244 },
      { x: 240, y: 160, waste: 240 },
      { x: 350, y: 130, waste: 258 },
      { x: 460, y: 140, waste: 253 },
      { x: 570, y: 95, waste: 275 },
      { x: 680, y: 70, waste: 286.5 },
    ];
    const trendLinePath =
      "M20 170 C56.7 170 93.3 155 130 155 C166.7 155 203.3 160 240 160 C276.7 160 313.3 130 350 130 C386.7 130 423.3 140 460 140 C496.7 140 533.3 95 570 95 C606.7 95 643.3 70 680 70";
    const documents = [
      { title: "SOP การแยกขยะอินทรีย์", subtitle: "ฉบับล่าสุด 1 พ.ค. 2569", icon: FileText },
      { title: "ตารางเก็บขยะอินทรีย์", subtitle: "2 รอบ/วัน (10:00, 16:00)", icon: CalendarClock },
      { title: "สัญญาผู้รับกำจัด", subtitle: "Green Waste Co., Ltd.", icon: Handshake },
      { title: "เป้าหมาย ESG", subtitle: "ลดขยะอินทรีย์ฝังกลบ 30% ภายในปี 2569", icon: Target },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 gap-20 overflow-hidden px-32 py-14">
          <div className="flex flex-col gap-4">
            <div className="min-w-0">
              <h4 className="text-2xl font-extrabold leading-tight text-slate-950">แหล่งที่เกิดขยะอินทรีย์ (Risk Heatmap)</h4>
              <div className="relative mt-3 w-[35vw] h-[65vh] overflow-hidden rounded-xl border border-sky-300 bg-sky-100">
                <Image src="/mockHotelMap.png" alt="แผนที่ความเสี่ยงของโรงแรม" fill className="object-cover" />
              </div>
            </div>

            <div className="flex-1 flex items-center w-full gap-10">
              <h4 className="text-lg font-medium leading-tight text-slate-700">ระดับความเสี่ยง</h4>
              <div className="space-x-6 flex h-full">
                {riskLevels.map((risk) => (
                  <div key={risk.label} className="flex items-center gap-3">
                    <span className={cn("h-3.5 w-3.5 rounded-full", risk.color)} />
                    <span className="text-base text-slate-500">{risk.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-8">
            <div className="flex min-w-0 flex-col">
              <h4 className="text-2xl font-extrabold leading-tight text-slate-950 mb-4">แนวโน้ม 7 วันย้อนหลัง (kg)</h4>
              <div className="relative mt-2 flex-1 rounded-xl border border-slate-100 bg-slate-50/60 px-4 pt-4">
                <StoryboardTrendChart
                  trendPoints={trendPoints}
                  trendLabels={trendLabels}
                  trendGridLines={trendGridLines}
                  trendLinePath={trendLinePath}
                />
              </div>
              <div className="mt-1.5 grid grid-cols-7 text-sm font-medium text-slate-500">
                {trendLabels.map((label) => (
                  <span key={label} className="text-center">{label}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-extrabold leading-tight text-slate-900 mb-4">นโยบายและเอกสารที่เกี่ยวข้อง</h4>
              <div className="flex min-w-0 flex-col justify-center gap-3 overflow-hidden rounded-xl bg-slate-50 px-6 py-5">
                {documents.map((doc) => {
                  const DocIcon = doc.icon;
                  return (
                    <div key={doc.title} className="flex min-w-0 px-3 py-2 items-center gap-5 rounded-lg hover:bg-gray-200">
                      <DocIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                      <div className="min-w-0">
                        <p className="truncate text-md font-medium leading-5 text-slate-900">{doc.title}</p>
                        <p className="truncate text-sm leading-4 text-slate-500">{doc.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m06") {
    const options = [
      { title: "Option A : เพิ่มรอบเก็บขยะอินทรีย์", result: "ลดภาระ 28%" },
      { title: "Option B : จำกัดเมนู (Refill) Buffet", result: "ลดลง 18%" },
      { title: "Option C : ส่งต่ออาหารส่วนเกินที่ยังกินได้", result: "120 Meals" },
      { title: "Option D : ตรวจสอบการแยกขยะ", result: "ลดปนเปื้อน 25%" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden py-40 px-80">
          <h4 className="w-[60vw] text-3xl font-extrabold text-slate-900">แนวทางที่สามารถดำเนินการได้</h4>
          {options.map((option) => (
            <Link href="/resource-intelligence/manager/storyboard/7"
              key={option.title}
              className="flex justify-between w-[60vw] rounded-xl bg-slate-100 px-6 py-5 transition-transform duration-150 hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="whitespace-pre-line text-2xl font-medium leading-tight text-slate-900">{option.title}</p>
              <div className="flex items-center justify-end gap-4">
                <span className="shrink-0 text-lg font-medium leading-7 text-emerald-600">{option.result}</span>
              </div>
            </Link>
          ))}
        </div>
      </article>
    );
  }

  if (step.id === "m07") {
    const decisions = [
      { label: "อนุมัติ เพิ่มรอบเก็บ 13:00 น.", status: "อนุมัติ", icon: CheckSquare },
      { label: "มอบหมาย Kitchen Manager", status: "มอบหมาย", icon: UserCog },
      { label: "แจ้งฝ่าย Housekeeping", status: "แจ้งแล้ว", icon: ClipboardList },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col justify-center gap-8 overflow-hidden px-90 py-40">
          <h4 className="text-3xl font-extrabold text-slate-900">การตัดสินใจของท่าน</h4>
          {decisions.map((decision) => {
            const DecisionIcon = decision.icon;
            return (
              <div key={decision.label} className="flex items-center gap-5 rounded-xl bg-slate-50 px-6 py-5">
                <DecisionIcon className="h-7 w-7 shrink-0 text-blue-700" />
                <p className="flex-1 text-xl font-medium leading-7 text-slate-900">{decision.label}</p>
                <span className="shrink-0 rounded-lg bg-emerald-50 px-4 py-2 text-lg font-extrabold text-emerald-600">{decision.status}</span>
              </div>
            );
          })}
        </div>
      </article>
    );
  }

  if (step.id === "m08") {
    const orderLines = [
      "เพิ่มรอบเก็บ 13:00 น.",
      "Kitchen Manager ควบคุมรอบเก็บ",
      "ให้ Steward จัดเตรียมถังเพิ่ม",
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 items-center justify-center overflow-hidden px-90 py-20">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-10 py-10 shadow-sm">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-slate-700" />
              <span className="text-2xl font-extrabold text-slate-800">HOTEL</span>
            </div>
            <p className="mt-4 text-2xl font-extrabold text-slate-900">คำสั่งภายในโรงแรม</p>
            <p className="mt-1 text-lg text-slate-500">เรื่อง: การจัดการเก็บขยะอินทรีย์เพิ่มเติม</p>
            <div className="mt-6 space-y-2">
              {orderLines.map((line, index) => (
                <p key={line} className="text-lg leading-7 text-slate-600">
                  {index + 1}. {line}
                </p>
              ))}
            </div>
            <Link href="/resource-intelligence/manager/storyboard/9"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-8 py-3 text-xl font-extrabold text-white shadow-sm transition-colors duration-150 hover:bg-emerald-700"
            >
              <Send className="h-6 w-6" />
              ออกคำสั่ง
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m09") {
    const metrics = [
      { label: "เก็บรอบ/ทั้งหมด", value: "2 / 3" },
      { label: "On-time", value: "98%" },
      { label: "Storage Level", value: "85%" },
    ];
    const rounds = [
      { label: "รอบเก็บ 10:00", progress: 100, color: "bg-emerald-500" },
      { label: "รอบเก็บ 13:00", progress: 55, color: "bg-blue-500" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col justify-center gap-10 overflow-hidden px-90 py-20">
          <h4 className="text-3xl font-extrabold text-slate-900">การดำเนินงานแบบ Real-time</h4>
          <div className="grid grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-slate-100 bg-white px-4 py-5 text-center shadow-sm">
                <p className="text-lg text-slate-500">{metric.label}</p>
                <p className="mt-1 text-4xl font-extrabold text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {rounds.map((round) => (
              <div key={round.label}>
                <div className="flex items-center gap-2 text-lg font-medium text-slate-700">
                  <Check className="h-5 w-5 text-emerald-600" />
                  {round.label}
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200">
                  <div className={cn("h-2.5 rounded-full", round.color)} style={{ width: `${round.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m10") {
    const channels = [
      { label: "Line OA", icon: MessageCircle, className: "bg-green-500 text-white" },
      { label: "Mobile App", icon: Smartphone, className: "bg-sky-500 text-white" },
      { label: "Email", icon: Mail, className: "bg-blue-600 text-white" },
      { label: "Board", icon: Boxes, className: "bg-violet-500 text-white" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center gap-10 overflow-hidden px-80 py-40 text-center">
          <h4 className="text-3xl font-extrabold text-slate-900">ช่องทางการสื่อสารภายใน</h4>
          <div className="grid grid-cols-4 gap-10">
            {channels.map((channel) => {
              const ChannelIcon = channel.icon;
              return (
                <div key={channel.label} className="flex flex-col items-center gap-3">
                  <span className={cn("grid h-16 w-16 place-items-center rounded-2xl", channel.className)}>
                    <ChannelIcon className="h-9 w-9" />
                  </span>
                  <span className="text-lg text-slate-500">{channel.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m11") {
    const outcomeMetrics = [
      { label: "ลดขยะได้", value: "28%", tone: "green" },
      { label: "ประหยัดต้นทุน", value: "38,000 บาท", tone: "blue" },
      { label: "ลดปริมาณของเสีย", value: "-35%", tone: "red" },
    ];
    const results = ["ปริมาณขยะอินทรีย์ลดลงต่อเนื่อง", "ลดค่าใช้จ่ายในการจัดการขยะ"];
    const toneText: Record<string, string> = {
      green: "text-emerald-600",
      blue: "text-blue-600",
      red: "text-rose-600",
    };

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col gap-16 justify-center overflow-hidden px-80 py-40">
          <div>
            <h4 className="text-3xl font-extrabold leading-tight text-slate-800">คาดการณ์ผลลัพธ์ (หากดำเนินงานตามแผน)</h4>
            <div className="mt-6 grid grid-cols-3 gap-6">
              {outcomeMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-100 bg-white px-4 py-5 text-center shadow-sm">
                  <p className="text-lg text-slate-500">{metric.label}</p>
                  <p className={cn("mt-2 text-4xl font-extrabold leading-tight", toneText[metric.tone])}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-3xl font-extrabold leading-tight text-slate-800">ผลลัพธ์ที่คาดว่าจะเกิดขึ้น</h4>
            <div className="mt-4 space-y-4">
              {results.map((result) => (
                <div key={result} className="flex items-center gap-3">
                  <Check className="h-6 w-6 shrink-0 stroke-[4] text-emerald-600" />
                  <span className="text-xl text-slate-500">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "m12") {
    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-16 py-12 text-center">
          <Landmark className="h-24 w-24 text-slate-700" />
          <h4 className="mt-8 text-5xl font-extrabold leading-tight text-blue-900">การสรุปข้อมูลประจำวันเสร็จสมบูรณ์</h4>
          <p className="mt-6 max-w-3xl text-2xl leading-9 text-slate-500">
            ขอให้การปฏิบัติราชการของท่านในวันนี้เป็นไปด้วยความเรียบร้อย
          </p>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-500">
            หมายเหตุเพิ่มเติม: หากมีเหตุการณ์สำคัญเพิ่มเติม CityZen Executive Office จะแจ้งให้ท่านทราบทันที
          </p>
        </div>
      </article>
    );

  }
}
