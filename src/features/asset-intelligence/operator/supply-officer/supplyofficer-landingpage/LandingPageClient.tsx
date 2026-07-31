"use client"

import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  FileSignature,
  FileText,
  Package,
  ScanLine,
  ShieldAlert,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import PieChart from "@/components/dashboard/PieCart"
import { CardMetric } from "@/components/dashboard/CardMetric"
import { CardData, type CardDataItemProps } from "@/components/dashboard/CardData"

import { ActivityCalendarCard } from "./component/ActivityCalendarCard"
import { NewsAnnouncementsCard } from "./component/NewsAnnouncementsCard"
import { RecentAssetsTableCard } from "./component/RecentAssetsTableCard"
import { auditProgressData } from "./mock/auditProgressData"
import { categoryChartData } from "./mock/categoryChartData"
import { pendingTasksData, type PendingTaskIcon } from "./mock/pendingTasksData"
import { statsData, type StatCardIcon, type StatCardTone } from "./mock/statsData"

const auditProgressChartData = [
  { label: "ตรวจนับแล้ว", value: auditProgressData.countedCount, color: "#22C55E" },
  { label: "คงเหลือ", value: auditProgressData.remainingCount, color: "#E5E7EB" },
]

// icon เดิมจาก StatCards.tsx — คงไว้เหมือนเดิมตามที่กำหนด
const statIconMap: Record<StatCardIcon, LucideIcon> = {
  file: FileText,
  "check-circle": CheckCircle2,
  wrench: Wrench,
  clock: Clock,
  "alert-triangle": AlertTriangle,
}

const statToneClassNames: Record<StatCardTone, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
}

// icon เดิมจาก PendingTasksCard.tsx — คงไว้เหมือนเดิมตามที่กำหนด
const pendingTaskIconMap: Record<PendingTaskIcon, LucideIcon> = {
  package: Package,
  "arrow-left-right": ArrowLeftRight,
  "scan-line": ScanLine,
  "file-signature": FileSignature,
  "shield-alert": ShieldAlert,
}

const pendingTaskItems: CardDataItemProps[] = pendingTasksData.map((task) => ({
  title: task.label,
  subtitle: `${task.subtitle} • ${task.count.toLocaleString("th-TH")} รายการ`,
  icon: pendingTaskIconMap[task.icon],
}))

export default function LandingPageClient() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden bg-white p-4">
      <h1 className="shrink-0 text-lg font-bold text-gray-900">ภาพรวมงานพัสดุ</h1>

      <div className="flex shrink-0 grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5 justify-around">
        {statsData.map((stat) => (
          <CardMetric
            key={stat.id}
            title={stat.label}
            value={stat.value}
            unit={stat.unit}
            subtitle={stat.helperText}
            icon={statIconMap[stat.icon]}
            classNameForIcon={statToneClassNames[stat.tone]}
            className="max-h-180 gap-2 p-5"
          />
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-3">
        <div className="grid min-h-0 grid-cols-3 gap-3 text-2xl">
          <CardData
            heading="งานที่ต้องดำเนินการ"
            items={pendingTaskItems}
            variant="icon"
            className="h-full min-h-0 max-h-none [&_h3]:text-xl [&_.gap-3]:gap-2 p-8"
          />
          <PieChart
            title="ครุภัณฑ์แยกตามประเภท"
            subtitle="แยกตามหมวดหมู่ครุภัณฑ์"
            unit="รายการ"
            data={categoryChartData}
            className="h-full min-h-0 max-w-none flex-1 gap-2 p-8 [&_h3]:text-xl [&_p]:text-2x [&_.gap-3]:gap-2"
          />
          <PieChart
            title={`การตรวจนับ (ปีงบประมาณ ${auditProgressData.fiscalYear})`}
            subtitle="ความคืบหน้าการตรวจนับครุภัณฑ์"
            unit="รายการ"
            data={auditProgressChartData}
            className="h-full min-h-0 max-w-none flex-1 gap-2 p-8 [&_h3]:text-xl"
          />
        </div>

        <div className="grid min-h-0 grid-cols-4 gap-3">
          <div className="col-span-3 min-h-0">
            <RecentAssetsTableCard />
          </div>
          <div className="col-span-1 flex min-h-0 flex-col gap-3">
            <NewsAnnouncementsCard />
            <ActivityCalendarCard />
          </div>
        </div>
      </div>
    </div>
  )
}
