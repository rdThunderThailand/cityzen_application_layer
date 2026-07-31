"use client"

import { ArrowRight, Check, Circle } from "lucide-react"

import { Button } from "@/components/basic/Button"

import type { WizardStepKey } from "../mock/types"
import type { WizardStepConfig } from "./WizardStepTabs"

interface WizardSummarySidebarProps {
  documentNo: string
  poNumber: string
  budget: number
  totalValue: number
  steps: WizardStepConfig[]
  currentStep: WizardStepKey
  completedSteps: WizardStepKey[]
  onBack: () => void
  onContinue: () => void
  continueLabel?: string
  isBackDisabled?: boolean
}

export function WizardSummarySidebar({
  documentNo,
  poNumber,
  budget,
  totalValue,
  steps,
  currentStep,
  completedSteps,
  onBack,
  onContinue,
  continueLabel = "บันทึกและดำเนินการต่อ",
  isBackDisabled = false,
}: WizardSummarySidebarProps) {
  const remaining = budget - totalValue

  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:w-72">
      <div>
        <p className="text-xs text-gray-400">เลขที่เอกสาร</p>
        <p className="text-sm font-semibold text-gray-900">{documentNo}</p>
        <p className="mt-2 text-xs text-gray-400">เลขที่ PO / สัญญา</p>
        <p className="text-sm font-medium text-gray-700">{poNumber}</p>
      </div>

      <div className="space-y-1.5 border-y border-gray-100 py-3 text-sm">
        <p className="flex justify-between text-gray-500">
          <span>งบประมาณ</span>
          <span className="font-medium text-gray-900">{budget.toLocaleString("th-TH")} บาท</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>มูลค่ารวม</span>
          <span className="font-medium text-gray-900">{totalValue.toLocaleString("th-TH")} บาท</span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>คงเหลือ</span>
          <span className="font-medium text-green-600">{remaining.toLocaleString("th-TH")} บาท</span>
        </p>
      </div>

      <ul className="space-y-2.5">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.key)
          const isCurrent = step.key === currentStep

          return (
            <li key={step.key} className="flex items-center gap-2 text-sm">
              {isCompleted ? (
                <Check className="h-4 w-4 shrink-0 text-green-600" />
              ) : (
                <Circle
                  className={`h-4 w-4 shrink-0 ${isCurrent ? "text-blue-600" : "text-gray-300"}`}
                  fill={isCurrent ? "currentColor" : "none"}
                />
              )}
              <span className={isCurrent ? "font-medium text-gray-900" : "text-gray-500"}>{step.label}</span>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-2">
        <Button
          onClick={onContinue}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {continueLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={onBack}
          disabled={isBackDisabled}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ย้อนกลับ
        </Button>
      </div>
    </aside>
  )
}
