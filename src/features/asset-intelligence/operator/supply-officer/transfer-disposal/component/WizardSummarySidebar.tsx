"use client"

import { ArrowRight, Lightbulb } from "lucide-react"

import type { TransferDisposalInfo } from "../mock/types"

interface WizardSummarySidebarProps {
  info: TransferDisposalInfo
  itemCount: number
  totalAssessedValue: number
  onBack: () => void
  onContinue: () => void
  onSaveDraft: () => void
  continueLabel: string
  isBackDisabled: boolean
  tipText: string
}

export function WizardSummarySidebar({
  info,
  itemCount,
  totalAssessedValue,
  onBack,
  onContinue,
  onSaveDraft,
  continueLabel,
  isBackDisabled,
  tipText,
}: WizardSummarySidebarProps) {
  const isDisposal = info.transactionType === "จำหน่าย"

  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:w-72">
      <h3 className="text-sm font-semibold text-gray-900">
        สรุปข้อมูลรายการ{info.transactionType}
      </h3>

      <div className="space-y-2 border-y border-gray-100 py-3 text-sm">
        <p className="flex justify-between text-gray-500">
          <span>เลขที่เอกสาร</span>
          <span className="font-medium text-gray-900">{info.documentNo}</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>วันที่ดำเนินการ</span>
          <span className="font-medium text-gray-900">{info.actionDate}</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>{isDisposal ? "วิธีจำหน่าย" : "หน่วยงานปลายทาง"}</span>
          <span className="font-medium text-gray-900">
            {isDisposal ? info.disposalMethod : info.destinationDepartment}
          </span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>หน่วยงานต้นทาง</span>
          <span className="font-medium text-gray-900">{info.sourceDepartment}</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>ผู้อนุมัติ</span>
          <span className="font-medium text-gray-900">{info.approver}</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>จำนวนครุภัณฑ์</span>
          <span className="font-medium text-gray-900">{itemCount} รายการ</span>
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-3">
        <p className="text-xs text-blue-600">มูลค่ารวมประเมิน</p>
        <p className="mt-1 text-lg font-bold text-blue-700">
          {totalAssessedValue.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{tipText}</span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onContinue}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {continueLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isBackDisabled}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ย้อนกลับ
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            บันทึกร่าง
          </button>
        </div>
      </div>
    </aside>
  )
}
