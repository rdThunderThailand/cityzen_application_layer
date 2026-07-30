"use client"

import { ActivityCalendarCard } from "../(common)/component/ActivityCalendarCard"
import { AssetCategoryChartCard } from "../(common)/component/AssetCategoryChartCard"
import { AuditProgressCard } from "../(common)/component/AuditProgressCard"
import { NewsAnnouncementsCard } from "../(common)/component/NewsAnnouncementsCard"
import { PendingTasksCard } from "../(common)/component/PendingTasksCard"
import { RecentAssetsTableCard } from "../(common)/component/RecentAssetsTableCard"
import { StatCards } from "../(common)/component/StatCards"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900">ภาพรวมงานพัสดุ</h1>

      <div className="mt-6">
        <StatCards />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PendingTasksCard />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AssetCategoryChartCard />
            <AuditProgressCard />
          </div>
          <RecentAssetsTableCard />
        </div>

        <div className="space-y-6">
          <NewsAnnouncementsCard />
          <ActivityCalendarCard />
        </div>
      </div>
    </main>
  )
}
