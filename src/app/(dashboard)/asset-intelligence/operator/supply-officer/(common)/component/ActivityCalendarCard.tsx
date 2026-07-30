"use client"

import { CalendarDays, MapPin } from "lucide-react"

import { eventsData } from "../mock/eventsData"

export function ActivityCalendarCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ปฏิทินกิจกรรม</h2>
      <ul className="mt-4 space-y-3">
        {eventsData.map((event) => (
          <li key={event.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <CalendarDays className="h-4 w-4 text-purple-600" />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">{event.title}</p>
              <p className="text-xs text-gray-400">
                {event.date} เวลา {event.startTime} - {event.endTime} น.
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="h-3 w-3" />
                {event.location}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
