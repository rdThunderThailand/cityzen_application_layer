"use client"

import PieChart from "@/components/dashboard/PieCart"
import { ActivityCalendarCard } from "./component/ActivityCalendarCard"
import { NewsAnnouncementsCard } from "./component/NewsAnnouncementsCard"
import { PendingTasksCard } from "./component/PendingTasksCard"
import { RecentAssetsTableCard } from "./component/RecentAssetsTableCard"
import { StatCards } from "./component/StatCards"
import { auditProgressData } from "./mock/auditProgressData"
import { categoryChartData } from "./mock/categoryChartData"

const auditProgressChartData = [
  { label: "ตรวจนับแล้ว", value: auditProgressData.countedCount, color: "#22C55E" },
  { label: "คงเหลือ", value: auditProgressData.remainingCount, color: "#E5E7EB" },
]

export default function LandingPageClient() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden bg-gray-50 p-4">
      <h1 className="shrink-0 text-lg font-bold text-gray-900">ภาพรวมงานพัสดุ</h1>

      <div className="shrink-0">
        <StatCards />
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-3">
        <div className="grid min-h-0 grid-cols-3 gap-3">
          <PendingTasksCard />
          <PieChart
            title="ครุภัณฑ์แยกตามประเภท"
            subtitle="แยกตามหมวดหมู่ครุภัณฑ์"
            unit="รายการ"
            data={categoryChartData}
            className="h-full min-h-0 max-w-none flex-1 gap-2 p-3"
          />
          <PieChart
            title={`การตรวจนับ (ปีงบประมาณ ${auditProgressData.fiscalYear})`}
            subtitle="ความคืบหน้าการตรวจนับครุภัณฑ์"
            unit="รายการ"
            data={auditProgressChartData}
            className="h-full min-h-0 max-w-none flex-1 gap-2 p-3"
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
