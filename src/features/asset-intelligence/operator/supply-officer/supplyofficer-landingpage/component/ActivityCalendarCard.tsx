"use client"

import { CalendarDays, MapPin } from "lucide-react"

import { eventsData } from "../mock/eventsData"

export function ActivityCalendarCard() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <h2 className="shrink-0 text-sm font-semibold text-gray-900">ปฏิทินกิจกรรม</h2>
      <ul className="mt-1 min-h-0 flex-1 space-y-1.5 overflow-hidden">
        {eventsData.map((event) => (
          <li key={event.id} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <CalendarDays className="h-3.5 w-3.5 text-purple-600" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-900">{event.title}</p>
              <p className="truncate text-[11px] text-gray-400">
                {event.date} เวลา {event.startTime} - {event.endTime} น.
              </p>
              <p className="flex items-center gap-1 truncate text-[11px] text-gray-400">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{event.location}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
