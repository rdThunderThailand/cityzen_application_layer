"use client"

import { Megaphone } from "lucide-react"

import { newsData } from "../mock/newsData"

export function NewsAnnouncementsCard() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <h2 className="shrink-0 text-sm font-semibold text-gray-900">ประกาศ / ข่าวสาร</h2>
      <ul className="mt-1 min-h-0 flex-1 space-y-1.5 overflow-hidden">
        {newsData.map((news) => (
          <li key={news.id} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <Megaphone className="h-3.5 w-3.5 text-blue-600" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-900">{news.title}</p>
              <p className="text-[11px] text-gray-400">{news.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
