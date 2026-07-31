"use client"

import { Tabs, type TabItem } from "@/components/basic/Tabs"

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
  const tabs: TabItem[] = steps.map((step) => ({
    value: step.key,
    title: completedSteps.includes(step.key) ? `✓ ${step.label}` : step.label,
  }))

  return <Tabs tabs={tabs} activeValue={currentStep} onChange={(value) => onStepClick(value as WizardStepKey)} />
}
