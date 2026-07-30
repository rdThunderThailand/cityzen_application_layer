"use client"

import { Megaphone } from "lucide-react"

import { newsData } from "../mock/newsData"

export function NewsAnnouncementsCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ประกาศ / ข่าวสาร</h2>
      <ul className="mt-4 space-y-3">
        {newsData.map((news) => (
          <li key={news.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <Megaphone className="h-4 w-4 text-blue-600" />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">{news.title}</p>
              <p className="text-xs text-gray-400">{news.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
