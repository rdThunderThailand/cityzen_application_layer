import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, Edit3, Landmark, MessageSquare, MonitorUp, PanelTop, Pen, Search, Scale, UserPlus, UsersRound, Circle } from "lucide-react";
import { cn } from "@/utils/cn";
import logo from "../../../../../../public/logo.png";
import type { StoryboardStep, StoryboardStepTone } from "../mock";
import { StoryboardTrendChart } from "./StoryboardTrendChart";

const metricToneClasses: Record<StoryboardStepTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-700",
  slate: "bg-slate-50 text-slate-700",
};

const cardShell = "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";

export function StoryboardStepCard({ step }: { step: StoryboardStep }) {
  const Icon = step.icon;

  if (step.id === "01") {
    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center px-10 py-10 text-center">
          <Image src={logo} alt="CityZen Executive Office" className="h-24 w-auto object-contain" loading="eager" />
          <div className="mt-4 leading-none">
            <p className="text-6xl font-extrabold tracking-normal text-slate-700">CITYZEN</p>
            <p className="mt-2 text-xl font-medium text-slate-700">Executive Office</p>
          </div>
          <p className="mt-8 text-4xl font-extrabold text-blue-900">สวัสดีครับท่านผู้ว่า</p>
          <div className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
            <p>CityZen Executive Office</p>
            <p>ได้จัดเตรียมข้อมูลประกอบการบริหารราชการประจำวันนี้เรียบร้อยแล้ว</p>
          </div>
        </div>
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
      <article className={cardShell}>
        <div className="flex flex-1 flex-col justify-between overflow-hidden p-40">
          <h4 className="text-4xl font-extrabold">แฟ้มสรุปประจำวัน</h4>
          <div className="mt-8 grid grid-cols-4 gap-6 px-21">
            {folders.map((folder) => {
              const color = folderClasses[folder.color];
              return (
                <Link
                  key={folder.label}
                  href="/resource-intelligence/executive/storyboard/3"
                  className={cn(
                    "relative flex h-52 flex-col items-center justify-center rounded-b-2xl rounded-tr-xl px-3 pt-5 text-center shadow-sm transition-transform duration-150 hover:-translate-y-5",
                    color.wrap
                  )}
                >
                  <span className={cn("absolute left-4 top-0 h-2.5 w-16 -translate-y-1 rounded-t-md", color.tab)} />
                  <p className="text-xl font-bold leading-6">{folder.label}</p>
                  <p className={cn("text-7xl font-extrabold leading-tight", color.text)}>{folder.value}</p>
                  <p className="text-base leading-5 opacity-80">{folder.unit}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <p className="text-2xl font-bold leading-8 text-slate-800">Executive Office</p>
            <p className="mt-2 text-xl leading-8 text-slate-500">
              วันนี้มีเรื่องที่ควรให้คุณอยู่พิจารณาจำนวน 3 เรื่องพบได้จัดลำดับความสำคัญ พร้อมรวบรวมข้อมูลจาก 14 หน่วยงานไว้เรียบร้อยแล้ว
            </p>
          </div>
        </div>
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
      <article className={cardShell}>
        <div className="flex flex-col overflow-hidden px-70 py-40">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="text-2xl leading-8 text-rose-500 font-bold">เรื่องด่วนอันดับ 1</p>
              <h4 className="mt-3 text-5xl font-extrabold leading-tight text-slate-900">
                สถานการณ์ขยะสะสมในพื้นที่ท่องเที่ยว
              </h4>
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold text-slate-500">Executive Summary</p>
          <p className="mt-3 text-xl leading-9 text-slate-500">
            ปริมาณขยะสะสมเพิ่มขึ้นต่อเนื่องเป็นวันที่ 6 หากไม่ดำเนินการเพิ่มเติม คาดว่ากำลังรองรับของสถานีพักขยะอาจเกินขีดจำกัดภายใน 5 วัน
          </p>

          <div className="mt-auto grid grid-cols-4 gap-6 pt-40">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="text-lg font-medium text-slate-500">{metric.label}</p>
                <p className="text-5xl font-extrabold leading-tight text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
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
      <article className={cardShell}>
        <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] items-center gap-26 overflow-hidden px-90 py-20">
          <div className="min-w-0">
            <h4 className="text-4xl font-extrabold leading-tight text-slate-900">รวบรวมจาก</h4>
            <h4 className="flex text-4xl font-medium leading-tight text-slate-900 whitespace-nowrap"> <pre className="text-blue-700 font-bold" style={{ height: '10%' }}>14 </pre> หน่วยงาน  <pre className="text-blue-700 font-bold" style={{ height: '10%' }}> 112 </pre>  แหล่งข้อมูล</h4>
            <div className="mt-8 space-y-5">
              {agencies.map((agency) => (
                <div key={agency} className="flex items-center gap-4 text-xl leading-8 text-slate-500">
                  <Circle className="h-3 w-3 shrink-0 fill-blue-800 text-blue-800" />
                  <span>{agency}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center bg-slate-50 p-14 rounded-xl border border-slate-200 shadow-md hover:-translate-y-5 hover:shadow-xl transition-transform duration-150">
            <div className="grid h-56 w-56 place-items-center rounded-full bg-[conic-gradient(#22b15f_0_96%,#dbeafe_96%_100%)]">
              <div className="grid h-40 w-40 place-items-center rounded-full bg-blue-50">
                <span className="text-6xl font-extrabold text-blue-800">96%</span>
              </div>
            </div>
            <span className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-2 text-xl font-extrabold text-emerald-600">
              Verified
            </span>
            <p className="mt-2 text-center text-lg text-slate-500">Data Integrity Complete</p>
            <div className="mt-5 w-full space-y-3">
              {validations.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-6 w-6 shrink-0 stroke-[4] text-blue-800" />
                  <div className="min-w-0 text-lg leading-7">
                    <p className="text-slate-500">{item.label}</p>
                    <p className="text-emerald-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    const trendGridLines = [60, 130, 200];
    const trendPoints = [
      { x: 20, y: 170, waste: 236 },
      { x: 130, y: 150, waste: 248 },
      { x: 240, y: 155, waste: 244 },
      { x: 350, y: 120, waste: 262 },
      { x: 460, y: 140, waste: 253 },
      { x: 570, y: 100, waste: 272 },
      { x: 680, y: 70, waste: 286.5 },
    ];
    const trendLinePath =
      "M20 170 C56.7 170 93.3 150 130 150 C166.7 150 203.3 155 240 155 C276.7 155 313.3 120 350 120 C386.7 120 423.3 140 460 140 C496.7 140 533.3 100 570 100 C606.7 100 643.3 70 680 70";
    const laws = [
      { title: "พ.ร.บ.การสาธารณสุข พ.ศ. 2535", subtitle: "มาตรา 18, 19, 20" },
      { title: "ระเบียบกระทรวงมหาดไทย", subtitle: "ว่าด้วยการจัดการมูลฝอย พ.ศ. 2560" },
      { title: "หนังสือสั่งการ มท 0808.2/ว 1234", subtitle: "เรื่อง การจัดการขยะในแหล่งท่องเที่ยว" },
      { title: "แผนการจัดการมูลฝอยจังหวัดภูเก็ต", subtitle: "พ.ศ. 2566 - 2570" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 gap-20 overflow-hidden px-32 py-14">
          <div className="flex flex-col gap-4">
            <div className="min-w-0">
              <h4 className="text-2xl font-extrabold leading-tight text-slate-950">แผนที่ความเสี่ยง (Risk Heatmap)</h4>
              <div className="relative mt-3 w-[35vw] h-[65vh] overflow-hidden rounded-xl border border-sky-300 bg-sky-100">
                <Image src="/mockmap.png" alt="แผนที่ความเสี่ยงจังหวัด" fill className="object-cover" />
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
              <h4 className="text-2xl font-extrabold leading-tight text-slate-950 mb-4">แนวโน้ม 7 วันข้างหน้า (คาดการณ์)</h4>
              <div className="relative mt-2 flex-1 rounded-xl border border-slate-100 bg-slate-50/60 px-4 pt-4">
                <StoryboardTrendChart
                  trendPoints={trendPoints}
                  trendLabels={trendLabels}
                  trendGridLines={trendGridLines}
                  trendLinePath={trendLinePath}
                />
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-sm font-extrabold text-slate-800 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  +24% ในสัปดาห์หน้า
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-7 text-sm font-medium text-slate-500">
                {trendLabels.map((label) => (
                  <span key={label} className="text-center">{label}</span>
                ))}
              </div>
            </div>

            <div className="">
              <h4 className="text-2xl font-extrabold leading-tight text-slate-900 mb-4">ฐานอ้างอิงทางกฎหมาย</h4>
              <div className="flex min-w-0 flex-col justify-center gap-3 overflow-hidden rounded-xl bg-slate-50 px-6 py-5">
                {laws.map((law) => (
                  <div key={law.title} className="flex min-w-0 px-3 py-2 items-center gap-5 rounded-lg hover:bg-gray-200">
                    <Scale className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                    <div className="min-w-0">
                      <p className="truncate text-md font-medium leading-5 text-slate-900">{law.title}</p>
                      <p className="truncate text-sm leading-4 text-slate-500">{law.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "06") {
    const options = [
      {
        title: "Option A : เพิ่มจุดทิ้งขยะชั่วคราวพร้อมเพิ่มรอบเก็บขยะ",
        budget: "งบ 2.45 ลบ.",
        timeline: "ดำเนินได้ทันที",
      },
      {
        title: "Option B : ขอสนับสนุนรถเก็บขนจาก อปท. และ เอกชน",
        budget: "งบ 1.80 ลบ.",
        timeline: "ภายใน 24 ชม.",
      },
      {
        title: "Option C : ประกาศมาตรการคัดแยกขยะและจำกัดเวลาทิ้งขยะในบางพื้นที่",
        budget: "งบ 0.35 ลบ.",
        timeline: "ภายใน 3 วัน",
      },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col items-center justify-center gap-12 overflow-hidden py-40 px-80">
          {options.map((option) => (
            <div key={option.title} className="rounded-xl w-[60vw] bg-slate-100 px-6 py-5 hover:shadow-xl hover:-translate-y-2 transition-transform duration-150">
              <p className="whitespace-pre-line text-2xl font-extrabold leading-tight text-slate-900">{option.title}</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xl font-medium leading-7 text-blue-500">{option.budget}</span>
                <span className="shrink-0 text-lg font-medium leading-7 text-emerald-600">{option.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (step.id === "07") {
    const actions = [
      { label: "ขอข้อมูลเพิ่มเติม", icon: Search },
      { label: "มอบหมายหน่วยงานวิเคราะห์เพิ่ม", icon: UserPlus },
      { label: "จัดทำร่างคำสั่ง", icon: Edit3 },
      { label: "ลงนามคำสั่ง", icon: CheckCircle2 },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 flex-col overflow-hidden px-150 py-40">
          <div className="bg-slate-100 p-10 rounded-xl h-full flex flex-col items-center justify-center">
            <div className="flex flex-1 flex-col justify-center gap-6 px-16 py-8">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <div key={action.label} className="flex items-center gap-5">
                    <Icon className="h-7 w-7 shrink-0 text-blue-500" />
                    <span className="text-2xl font-medium text-slate-900">{action.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-slate-200 px-8 py-5 text-center">
              <p className="text-2xl font-extrabold text-slate-600">Executive Office พร้อมจัดเตรียมร่างคำสั่งให้ท่าน</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "08") {
    return (
      <article className={cardShell}>
        <div className="flex flex-col flex-1 gap-10 items-center justify-center px-40 py-20">
          <Image src="/doc.png" alt="sign" width={500} height={500} />
          <button
            type="button"
            className="flex h-12 w-fit px-20 items-center justify-center gap-4 rounded-xl bg-emerald-600 px-8 text-xl font-extrabold text-white shadow-sm transition-colors duration-150 hover:bg-emerald-700"
          >
            <Pen className="h-6 w-6" />
            ลงนามคำสั่ง
          </button>
        </div>
      </article>
    );
  }


  if (step.id === "09") {
    const channels = [
      { label: "Line OA", text: "LINE", className: "bg-green-500 text-white" },
      { label: "Website", icon: PanelTop, className: "bg-sky-500 text-white" },
      { label: "Facebook", text: "f", className: "bg-blue-600 text-white" },
      { label: "LED Board", icon: MonitorUp, className: "bg-violet-500 text-white" },
      { label: "SMS", icon: MessageSquare, className: "bg-sky-500 text-white" },
    ];

    return (
      <article className={cardShell}>
        <div className="flex flex-1 items-center overflow-hidden px-80 py-40">
          <div className="w-full rounded-xl border border-slate-100 bg-white px-8 py-8 shadow-sm">
            <h4 className="text-3xl font-extrabold leading-tight text-slate-800">คาดการณ์ผลลัพธ์ (หากดำเนินงานตามแผน)</h4>
            <p className="mt-4 text-xl leading-9 text-slate-500">
              จังหวัดภูเก็ตดำเนินมาตรการจัดการขยะในพื้นที่ท่องเที่ยว ป่าตอง - กะตะ - กะรน เพื่อรักษาความสะอาดและความปลอดภัยของนักท่องเที่ยว
            </p>

            <div className="mt-8 grid grid-cols-5 gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.label} className="flex min-w-0 flex-col items-center gap-2">
                    <span className={cn("grid h-16 w-16 place-items-center rounded-2xl text-3xl font-extrabold", channel.className)}>
                      {Icon ? <Icon className="h-9 w-9" /> : channel.text}
                    </span>
                    <span className="text-lg text-slate-500">{channel.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "10") {
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
      <article className={cardShell}>
        <div className="flex flex-1 flex-col gap-20 justify-center overflow-hidden px-80 py-40">
          <div>
            <h4 className="text-3xl font-extrabold leading-tight text-slate-800">คาดการณ์ผลลัพธ์ (หากดำเนินงานตามแผน)</h4>
            <div className="mt-6 grid grid-cols-3 gap-6">
              {outcomeMetrics.map((metric) => {
                const isGreen = metric.tone === "green";
                return (
                  <div key={metric.label} className="rounded-xl border border-slate-100 bg-white px-4 py-5 text-center shadow-sm">
                    <p className="text-lg text-slate-500">{metric.label}</p>
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className={cn("text-4xl font-extrabold leading-tight", isGreen ? "text-emerald-600" : "text-red-800")}>
                        {metric.value}
                      </span>
                      <span className={cn("text-xl font-extrabold", isGreen ? "text-emerald-600" : "text-red-500")}>{metric.suffix}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mt-8 text-3xl font-extrabold leading-tight text-slate-800">ผลลัพธ์ที่คาดว่าจะเกิดขึ้น</h4>
            <div className="mt-4 space-y-4">
              {results.map((result) => (
                <div key={result} className="flex items-center gap-3">
                  <Check className="h-6 w-6 shrink-0 stroke-[4] text-emerald-600" />
                  <span className="truncate text-xl text-slate-500">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (step.id === "11") {
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

  return (
    <article className={cardShell}>
      <div className="flex flex-1 gap-6 overflow-hidden px-12 py-10">
        <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-xl", metricToneClasses[step.tone])}>
          <Icon className="h-9 w-9" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="space-y-2">
            {step.lines.map((line) => (
              <p key={line} className="text-xl leading-8 text-slate-600">
                {line}
              </p>
            ))}
          </div>

          {step.metrics && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              {step.metrics.map((metric) => (
                <div key={`${step.id}-${metric.label}`} className={cn("rounded-xl px-4 py-3", metricToneClasses[metric.tone ?? "slate"])}>
                  <p className="text-base font-medium opacity-80">{metric.label}</p>
                  <p className="text-2xl font-bold leading-8">{metric.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
