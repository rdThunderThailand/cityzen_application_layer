"use client"

import { Check } from "lucide-react"

import type { WizardStepKey } from "../mock/types"

export interface WizardStepConfig {
  key: WizardStepKey
  label: string
}

interface WizardStepTabsProps {
  steps: WizardStepConfig[]
  currentStep: WizardStepKey
  completedSteps: WizardStepKey[]
  onStepClick: (step: WizardStepKey) => void
}

export function WizardStepTabs({ steps, currentStep, completedSteps, onStepClick }: WizardStepTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 pb-3">
      {steps.map((step, index) => {
        const isActive = step.key === currentStep
        const isCompleted = completedSteps.includes(step.key)

        return (
          <button
            key={step.key}
            type="button"
            onClick={() => onStepClick(step.key)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : isCompleted
                  ? "text-gray-600 hover:bg-gray-50"
                  : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {isCompleted && !isActive ? <Check className="h-3 w-3" /> : index + 1}
            </span>
            {step.label}
          </button>
        )
      })}
    </div>
  )
}
