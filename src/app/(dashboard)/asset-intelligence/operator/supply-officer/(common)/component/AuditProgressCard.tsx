"use client"

import { ScanLine } from "lucide-react"

import { auditProgressData } from "../mock/auditProgressData"

const RING_RADIUS = 54
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function AuditProgressCard() {
  const { fiscalYear, countedCount, remainingCount, totalPlannedCount, progressPercentage } =
    auditProgressData
  const dashOffset = RING_CIRCUMFERENCE - (progressPercentage / 100) * RING_CIRCUMFERENCE

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">การตรวจนับ ปีงบประมาณ {fiscalYear}</h2>
      <div className="mt-4 flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={RING_RADIUS}
              fill="none"
              stroke="#22C55E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">{progressPercentage}%</span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5 text-sm">
          <p className="flex justify-between text-gray-600">
            <span>ตรวจนับแล้ว</span>
            <span className="font-semibold text-gray-900">{countedCount.toLocaleString("th-TH")}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>คงเหลือ</span>
            <span className="font-semibold text-gray-900">{remainingCount.toLocaleString("th-TH")}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>แผนตรวจนับทั้งหมด</span>
            <span className="font-semibold text-gray-900">
              {totalPlannedCount.toLocaleString("th-TH")}
            </span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-100"
      >
        <ScanLine className="h-4 w-4" />
        บันทึกผลการตรวจนับ
      </button>
    </div>
  )
}
