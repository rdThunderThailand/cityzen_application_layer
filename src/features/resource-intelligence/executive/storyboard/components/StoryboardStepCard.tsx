import Image from "next/image";
import { Check, CheckCircle2, ChevronRight, Edit3, Landmark, MessageSquare, MonitorUp, PanelTop, Pen, Search, Scale, Truck, UserPlus, UsersRound } from "lucide-react";
import { cn } from "@/utils/cn";
import logo from "../../../../../../public/logo.png";
import type { StoryboardStep, StoryboardStepTone } from "../mock";

const toneClasses: Record<StoryboardStepTone, string> = {
  blue: "bg-blue-600 text-white",
  green: "bg-emerald-600 text-white",
  amber: "bg-amber-500 text-white",
  red: "bg-rose-600 text-white",
  slate: "bg-slate-700 text-white",
};

const metricToneClasses: Record<StoryboardStepTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-700",
  slate: "bg-slate-50 text-slate-700",
};

export function StoryboardStepCard({ step }: { step: StoryboardStep }) {
  const Icon = step.icon;
  
  const hoverFooter = (
    <div className="group/footer absolute inset-x-0 bottom-0 h-12">
      <div className="flex h-12 translate-y-full items-center justify-between border-t border-slate-200 bg-white px-4 text-slate-800 shadow-[0_-8px_18px_rgba(15,23,42,0.08)] transition-transform duration-200 group-hover/footer:translate-y-0">
        <span className="text-sm font-extrabold">ดูข้อมูลทั้งหมด</span>
        <ChevronRight className="h-5 w-5 text-slate-500" />
      </div>
    </div>
  );

  if (step.id === "01") {
    return (
      <article className="group relative flex h-[80vh] flex-col overflow-hidden rounded-lg bg-blue-300 shadow-sm ">
        {/* <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-900 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header> */}

        <div className="flex flex-1 flex-col items-center justify-center px-3 py-3 text-center">
          <Image src={logo} alt="CityZen Executive Office" className="h-10 w-auto object-contain" loading="eager" />
          <div className="mt-1.5 leading-none">
            <p className="text-2xl font-extrabold tracking-normal text-slate-700">CITYZEN</p>
            <p className="mt-0.5 text-xs font-medium text-slate-700">Executive Office</p>
          </div>
          <p className="mt-3 text-sm font-extrabold text-blue-900">สวัสดีครับท่านผู้ว่า</p>
          <div className="mt-2 text-[11px] leading-4 text-slate-500">
            <p>CityZen Executive Office</p>
            <p className="line-clamp-2">ได้จัดเตรียมข้อมูลประกอบการบริหารราชการประจำวันนี้เรียบร้อยแล้ว</p>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "02") {
    const folders = [
      { label: "เรื่องด่วน", value: "3", unit: "เรื่อง", color: "rose" },
      { label: "เรื่องเพื่อพิจารณา", value: "5", unit: "เรื่อง", color: "sky" },
      { label: "เรื่องติดตาม", value: "12", unit: "เรื่อง", color: "emerald" },
      { label: "เรื่องเพื่อทราบ", value: "18", unit: "เรื่อง", color: "amber" },
    ];

    const folderClasses: Record<string, { wrap: string; tab: string; text: string }> = {
      rose: { wrap: "bg-rose-50 text-rose-600", tab: "bg-rose-500", text: "text-rose-600" },
      sky: { wrap: "bg-sky-50 text-sky-600", tab: "bg-sky-500", text: "text-sky-600" },
      emerald: { wrap: "bg-emerald-50 text-emerald-600", tab: "bg-emerald-500", text: "text-emerald-600" },
      amber: { wrap: "bg-amber-50 text-amber-600", tab: "bg-amber-500", text: "text-amber-600" },
    };

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col justify-between overflow-hidden px-3 py-3">
          <h4 className="text-sm font-extrabold text-blue-900">แฟ้มสรุปประจำวัน</h4>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {folders.map((folder) => {
              const color = folderClasses[folder.color];
              return (
                <div
                  key={folder.label}
                  className={cn(
                    "relative flex h-[75px] flex-col items-center justify-center rounded-b-lg rounded-tr-md px-1.5 pt-2 text-center shadow-sm transition-transform duration-150 hover:-translate-y-1",
                    color.wrap
                  )}
                >
                  <span className={cn("absolute left-2 top-0 h-1.5 w-8 -translate-y-1 rounded-t-sm", color.tab)} />
                  <p className="line-clamp-2 text-[9px] font-bold leading-3">{folder.label}</p>
                  <p className={cn("text-lg font-extrabold leading-5", color.text)}>{folder.value}</p>
                  <p className="text-[9px] leading-3 opacity-80">{folder.unit}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-2 min-w-0">
            <p className="text-[11px] font-bold leading-4 text-slate-800">Executive Office</p>
            <p className="line-clamp-2 text-[10px] leading-4 text-slate-500">
              วันนี้มีเรื่องที่ควรให้คุณอยู่พิจารณาจำนวน 3 เรื่องพบได้จัดลำดับความสำคัญ พร้อมรวบรวมข้อมูลจาก 14 หน่วยงานไว้เรียบร้อยแล้ว
            </p>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "03") {
    const metrics = [
      { label: "ระดับผลกระทบ", value: "สูง" },
      { label: "ปริมาณขยะสะสม", value: "286.5" },
      { label: "เพิ่มขึ้นจากปกติ", value: "18%" },
      { label: "คาดว่าเพิ่มขึ้นใน 3 วัน", value: "+24%" },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] leading-4 text-slate-500">เรื่องด่วนอันดับ 1</p>
              <h4 className="mt-1 line-clamp-2 text-sm font-extrabold leading-5 text-slate-900">
                สถานการณ์ขยะสะสมในพื้นที่ท่องเที่ยว
              </h4>
            </div>
            <span className="shrink-0 rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[9px] font-extrabold text-rose-600">
              ALERT
            </span>
          </div>

          <p className="mt-2 text-[11px] font-bold text-slate-500">Executive Summary</p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">
            ปริมาณขยะสะสมเพิ่มขึ้นต่อเนื่องเป็นวันที่ 6 หากไม่ดำเนินการเพิ่มเติม คาดว่ากำลังรองรับของสถานีพักขยะอาจเกินขีดจำกัดภายใน 5 วัน
          </p>

          <div className="mt-auto grid grid-cols-4 gap-2 pt-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="truncate text-[9px] font-medium text-slate-500">{metric.label}</p>
                <p className="truncate text-lg font-extrabold leading-6 text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "04") {
    const agencies = [
      "เทศบาลเมืองป่าตอง",
      "อบจ.ภูเก็ต",
      "กรมควบคุมมลพิษ",
      "กรมอุตุนิยมวิทยา",
      "CCTV AI (HD 56 จุด)",
      "IoT Sensors (28 ชุด)",
    ];
    const validations = [
      { label: "Law Verification", value: "Verified" },
      { label: "Budget Availability", value: "Available" },
      { label: "Agency Consensus", value: "7 / 9 Agencies" },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-3 overflow-hidden px-3 py-3">
          <div className="min-w-0">
            <h4 className="line-clamp-2 text-sm font-extrabold leading-5 text-slate-900">รวบรวมจาก 14 หน่วยงาน 112 แหล่งข้อมูล</h4>
            <div className="mt-2 space-y-1.5">
              {agencies.map((agency) => (
                <div key={agency} className="flex items-center gap-2 text-[11px] leading-4 text-slate-500">
                  <Check className="h-3.5 w-3.5 shrink-0 stroke-[4] text-blue-800" />
                  <span className="truncate">{agency}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-start">
            <div className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[conic-gradient(#22b15f_0_96%,#dbeafe_96%_100%)]">
              <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-blue-50">
                <span className="text-xl font-extrabold text-blue-800">96%</span>
              </div>
            </div>
            <span className="mt-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600">
              Verified
            </span>
            <p className="mt-1 text-center text-[10px] leading-3 text-slate-500">Data Integrity Complete</p>
            <div className="mt-1.5 w-full space-y-1">
              {validations.map((item) => (
                <div key={item.label} className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[4] text-blue-800" />
                  <div className="min-w-0 text-[10px] leading-3">
                    <p className="truncate text-slate-500">{item.label}</p>
                    <p className="truncate text-emerald-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "05") {
    const riskLevels = [
      { label: "วิกฤต", color: "bg-red-500" },
      { label: "เสี่ยงสูง", color: "bg-orange-500" },
      { label: "เฝ้าระวัง", color: "bg-amber-500" },
      { label: "ต่ำ", color: "bg-emerald-500" },
    ];
    const trendLabels = ["2 พ.ค.", "3 พ.ค.", "4 พ.ค.", "5 พ.ค.", "6 พ.ค.", "7 พ.ค.", "8 พ.ค."];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-3">
          <div className="grid grid-cols-[1fr_90px] gap-3">
            <div className="min-w-0">
              <h4 className="text-[11px] font-extrabold leading-4 text-slate-950">แผนที่ความเสี่ยง (Risk Heatmap)</h4>
              <div className="relative mt-1.5 h-[56px] overflow-hidden rounded-md bg-sky-200">
                <div className="absolute -left-3 top-0 h-full w-14 rotate-[-5deg] bg-sky-300" />
                <div className="absolute left-[36%] top-0 h-full w-14 skew-x-[16deg] bg-yellow-300" />
                <div className="absolute left-[52%] top-1 h-16 w-14 -skew-x-[18deg] bg-orange-500" />
                <div className="absolute left-[66%] top-3 h-14 w-14 rotate-[20deg] bg-red-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_38%,transparent_0_22px,rgba(255,255,255,0.65)_23px_24px,transparent_25px),radial-gradient(circle_at_18%_58%,transparent_0_28px,rgba(255,255,255,0.65)_29px_30px,transparent_31px)]" />
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-[11px] font-semibold leading-4 text-slate-700">ระดับความเสี่ยง</h4>
              <div className="mt-2 space-y-1.5">
                {riskLevels.map((risk) => (
                  <div key={risk.label} className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", risk.color)} />
                    <span className="text-[10px] text-slate-500">{risk.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h4 className="text-[11px] font-extrabold leading-4 text-slate-950">แนวโน้ม 7 วันข้างหน้า (คาดการณ์)</h4>
          <div className="relative mt-0.5 h-[39px]">
            <svg viewBox="0 0 280 52" className="h-full w-full overflow-visible" aria-hidden="true">
              <path d="M0 43 C31 42 42 31 70 28 C94 25 112 24 134 16 C154 9 169 12 188 29 C209 47 230 34 248 27 C261 23 270 23 280 23" fill="none" stroke="#ef4444" strokeWidth="3.2" />
              {[18, 72, 112, 154, 202, 246, 280].map((x, index) => {
                const y = [40, 28, 25, 16, 36, 27, 23][index];
                return <circle key={x} cx={x} cy={y} r="4.7" fill="#ef4444" />;
              })}
            </svg>
          </div>
          <div className="grid grid-cols-7 text-[9px] font-medium text-slate-500">
            {trendLabels.map((label) => (
              <span key={label} className="truncate text-center">{label}</span>
            ))}
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "06") {
    const laws = [
      { title: "พ.ร.บ.การสาธารณสุข พ.ศ. 2535", subtitle: "มาตรา 18, 19, 20" },
      { title: "ระเบียบกระทรวงมหาดไทย", subtitle: "ว่าด้วยการจัดการมูลฝอย พ.ศ. 2560" },
      { title: "หนังสือสั่งการ มท 0808.2/ว 1234", subtitle: "เรื่อง การจัดการขยะในแหล่งท่องเที่ยว" },
      { title: "แผนการจัดการมูลฝอยจังหวัดภูเก็ต", subtitle: "พ.ศ. 2566 - 2570" },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden px-4 py-3">
          {laws.map((law) => (
            <div key={law.title} className="flex min-w-0 items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <div className="min-w-0">
                <p className="truncate text-[12px] font-extrabold leading-4 text-slate-900">{law.title}</p>
                <p className="truncate text-[10px] leading-4 text-slate-500">{law.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "07") {
    const options = [
      {
        title: "Option A: เพิ่มจุดทิ้งขยะชั่วคราวพร้อมเพิ่มรอบเก็บขยะ",
        budget: "งบ 2.45 ลบ.",
        timeline: "ดำเนินได้ทันที",
      },
      {
        title: "Option B: ขอสนับสนุนรถเก็บขนจาก อปท. และ เอกชน",
        budget: "งบ 1.80 ลบ.",
        timeline: "ภายใน 24 ชม.",
      },
      {
        title: "Option\nประกาศมาตรการคัดแยกขยะและจำกัดเวลาทิ้งขยะในบางพื้นที่",
        budget: "งบ 0.35 ลบ.",
        timeline: "ภายใน 3 วัน",
      },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden px-4 py-3">
          {options.map((option) => (
            <div key={option.title} className="rounded-lg bg-slate-50 px-3 py-2">
              <p className="line-clamp-2 whitespace-pre-line text-[12px] font-extrabold leading-4 text-slate-900">{option.title}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-[12px] font-medium leading-4 text-blue-500">{option.budget}</span>
                <span className="shrink-0 text-[11px] font-medium leading-4 text-emerald-600">{option.timeline}</span>
              </div>
            </div>
          ))}
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "08") {
    const actions = [
      { label: "ขอข้อมูลเพิ่มเติม", icon: Search },
      { label: "เรียกประชุม War Room", icon: UsersRound },
      { label: "มอบหมายหน่วยงานวิเคราะห์เพิ่ม", icon: UserPlus },
      { label: "จัดทำร่างคำสั่ง", icon: Edit3 },
      { label: "ลงนามคำสั่ง", icon: CheckCircle2 },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col justify-center gap-2 rounded-none bg-slate-50 px-3 py-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="truncate text-[13px] font-medium text-slate-900">{action.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 rounded-lg bg-slate-200 px-3 py-2 text-center">
            <p className="truncate text-[13px] font-extrabold text-slate-600">Executive Office พร้อมจัดเตรียมร่างคำสั่งให้ท่าน</p>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "09") {
    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-4">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-emerald-600 px-4 text-base font-extrabold text-white shadow-sm transition-colors duration-150 hover:bg-emerald-700"
          >
            <Pen className="h-6 w-6" />
            ลงนามคำสั่ง
          </button>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "10") {
    const stats = [
      { label: "หน่วยงาน", value: "18" },
      { label: "กำลังพล", value: "24" },
      { label: "เครื่องจักร", value: "16" },
      { label: "Progress", value: "67%" },
    ];
    const tasks = [
      { label: "เพิ่มรอบเก็บขน: ป่าตอง", progress: 80 },
      { label: "จัดตั้งจุดพักขยะชั่วคราว", progress: 60 },
      { label: "จัดตั้งจุดพักขยะชั่วคราว", progress: 50 },
      { label: "จัดตั้งจุดพักขยะชั่วคราว", progress: 70 },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-2.5">
          <div className="grid grid-cols-4 gap-1.5">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="truncate text-[9px] text-slate-500">{stat.label}</p>
                <p className="truncate text-lg font-extrabold leading-5 text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid flex-1 grid-cols-[1.2fr_0.8fr] gap-2.5 overflow-hidden">
            <div className="flex flex-col justify-center gap-1.5">
              {tasks.map((task) => (
                <div key={`${task.label}-${task.progress}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[9px] font-medium text-slate-900">{task.label}</span>
                    <span className="text-[9px] font-extrabold text-emerald-600">{task.progress}%</span>
                  </div>
                  <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-md bg-slate-100">
              <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_0_44%,rgba(148,163,184,0.22)_45%_47%,transparent_48%),linear-gradient(120deg,transparent_0_54%,rgba(148,163,184,0.22)_55%_57%,transparent_58%)]" />
              <div className="absolute left-[18%] top-[25%] rounded bg-white/70 p-0.5 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <div className="absolute left-[60%] top-[48%] rounded bg-white/70 p-0.5 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <div className="absolute left-[32%] top-[70%] rounded bg-white/70 p-0.5 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-emerald-700" />
              </div>
            </div>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "11") {
    const channels = [
      { label: "Line OA", text: "LINE", className: "bg-green-500 text-white" },
      { label: "Website", icon: PanelTop, className: "bg-sky-500 text-white" },
      { label: "Facebook", text: "f", className: "bg-blue-600 text-white" },
      { label: "LED Board", icon: MonitorUp, className: "bg-violet-500 text-white" },
      { label: "SMS", icon: MessageSquare, className: "bg-sky-500 text-white" },
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 items-center overflow-hidden px-4 py-3">
          <div className="w-full rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm">
            <h4 className="text-[13px] font-extrabold leading-5 text-slate-800">คาดการณ์ผลลัพธ์ (หากดำเนินงานตามแผน)</h4>
            <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-slate-500">
              จังหวัดภูเก็ตดำเนินมาตรการจัดการขยะในพื้นที่ท่องเที่ยว ป่าตอง - กะตะ - กะรน เพื่อรักษาความสะอาดและความปลอดภัยของนักท่องเที่ยว
            </p>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.label} className="flex min-w-0 flex-col items-center gap-1">
                    <span className={cn("grid h-9 w-9 place-items-center rounded-xl text-lg font-extrabold", channel.className)}>
                      {Icon ? <Icon className="h-5 w-5" /> : channel.text}
                    </span>
                    <span className="truncate text-[10px] text-slate-500">{channel.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  if (step.id === "12") {
    const outcomeMetrics = [
      { label: "ปริมาณขยะ", value: "-18%", suffix: "ลดลง", tone: "red" },
      { label: "เรื่องร้องเรียน", value: "-32%", suffix: "ลดลง", tone: "red" },
      { label: "ความพึงพอใจ", value: "+24%", suffix: "เพิ่มขึ้น", tone: "green" },
    ];
    const results = [
      "สถานการณ์คลี่คลายใน 24 ชั่วโมง",
      "ลดความเสี่ยงต่อสุขภาพประชาชนลดความเสี่ยงต่อสุขภาพประชาชน",
      "รักษาภาพลักษณ์การท่องเที่ยวของจังหวัด",
    ];

    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden px-3 ">
          <h4 className="text-[13px] font-extrabold leading-5 text-slate-800">คาดการณ์ผลลัพธ์ (หากดำเนินงานตามแผน)</h4>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {outcomeMetrics.map((metric) => {
              const isGreen = metric.tone === "green";
              return (
                <div key={metric.label} className="rounded-md border border-slate-100 bg-white px-2 py-1.5 text-center shadow-sm">
                  <p className="truncate text-[11px] text-slate-500">{metric.label}</p>
                  <div className="mt-0.5 flex items-baseline justify-center gap-1">
                    <span className={cn("text-md font-extrabold leading-6", isGreen ? "text-emerald-600" : "text-red-800")}>
                      {metric.value}
                    </span>
                    <span className={cn("text-[11px] font-extrabold", isGreen ? "text-emerald-600" : "text-red-500")}>{metric.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <h4 className="mt-2 text-[13px] font-extrabold leading-5 text-slate-800">ผลลัพธ์ที่คาดว่าจะเกิดขึ้น</h4>
          <div className="mt-1.5 space-y-2">
            {results.map((result) => (
              <div key={result} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 shrink-0 stroke-[4] text-emerald-600" />
                <span className="truncate text-[11px] text-slate-500">{result}</span>
              </div>
            ))}
          </div>
        </div>
        {hoverFooter}
      </article>
    );
  }

  if (step.id === "13") {
    return (
      <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {step.id}
            </span>
            <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
          </div>
          <span className="text-[10px] text-slate-400">{step.time}</span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-4 text-center">
          <Landmark className="h-12 w-12 text-slate-700" />
          <h4 className="mt-4 text-lg font-extrabold leading-6 text-blue-900">การสรุปข้อมูลประจำวันเสร็จสมบูรณ์</h4>
          <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-slate-500">
            ขอให้การปฏิบัติราชการของท่านในวันนี้เป็นไปด้วยความเรียบร้อย
          </p>
          <p className="mt-4 line-clamp-2 text-[11px] leading-4 text-slate-500">
            หมายเหตุเพิ่มเติม: หากมีเหตุการณ์สำคัญเพิ่มเติม CityZen Executive Office จะแจ้งให้ท่านทราบทันที
          </p>
        </div>
        {/* {hoverFooter} */}
      </article>
    );
  }

  return (
    <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-100 px-2.5 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold", toneClasses[step.tone])}>
            {step.id}
          </span>
          <h3 className="truncate text-[11px] font-bold text-slate-800">{step.title}</h3>
        </div>
        <span className="text-[10px] text-slate-400">{step.time}</span>
      </header>

      <div className="flex flex-1 gap-2.5 overflow-hidden px-3 py-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", metricToneClasses[step.tone])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="space-y-1">
            {step.lines.map((line) => (
              <p key={line} className="truncate text-[11px] leading-4 text-slate-600">
                {line}
              </p>
            ))}
          </div>

          {step.metrics && (
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {step.metrics.map((metric) => (
                <div key={`${step.id}-${metric.label}`} className={cn("rounded-md px-2 py-1.5", metricToneClasses[metric.tone ?? "slate"])}>
                  <p className="truncate text-[9px] font-medium opacity-80">{metric.label}</p>
                  <p className="text-sm font-bold leading-5">{metric.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* {hoverFooter} */}
    </article>
  );
}
