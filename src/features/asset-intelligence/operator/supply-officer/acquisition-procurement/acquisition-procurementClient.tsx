"use client"

import { useMemo, useState } from "react"

import { AddItemModal } from "./component/AddItemModal"
import { ConfirmSummaryPanel } from "./component/ConfirmSummaryPanel"
import { ImportExcelModal } from "./component/ImportExcelModal"
import { ReceivingInfoForm } from "./component/ReceivingInfoForm"
import { ReceivingItemsPanel } from "./component/ReceivingItemsPanel"
import { SelectFromPlanModal } from "./component/SelectFromPlanModal"
import { SupportingDocumentsPanel } from "./component/SupportingDocumentsPanel"
import { WizardStepTabs, type WizardStepConfig } from "./component/WizardStepTabs"
import { WizardSummarySidebar } from "./component/WizardSummarySidebar"
import { receivingInfoMock } from "./mock/receivingInfo.mock"
import { receivingItemsMock } from "./mock/receivingItems.mock"
import { supportingDocumentsMock } from "./mock/supportingDocuments.mock"
import type { ReceivingItem, SupportingDocument, WizardStepKey } from "./mock/types"

const STEPS: WizardStepConfig[] = [
  { key: "receiving-info", label: "ข้อมูลการรับเข้า" },
  { key: "asset-items", label: "รายการครุภัณฑ์" },
  { key: "documents", label: "เอกสารประกอบ" },
  { key: "confirm", label: "ตรวจสอบและยืนยัน" },
]

export default function AcquisitionProcurementClient() {
  const [currentStep, setCurrentStep] = useState<WizardStepKey>("receiving-info")
  const [completedSteps, setCompletedSteps] = useState<WizardStepKey[]>([])
  const [items, setItems] = useState<ReceivingItem[]>(receivingItemsMock)
  const [documents, setDocuments] = useState<SupportingDocument[]>(supportingDocumentsMock)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const [isImportOpen, setIsImportOpen] = useState(false)
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [isSelectPlanOpen, setIsSelectPlanOpen] = useState(false)

  const totalValue = useMemo(() => items.reduce((sum, item) => sum + item.totalPrice, 0), [items])

  const handleContinue = () => {
    setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]))
    const currentIndex = STEPS.findIndex((step) => step.key === currentStep)
    const nextStep = STEPS[currentIndex + 1]
    if (nextStep) setCurrentStep(nextStep.key)
  }

  const handleBack = () => {
    const currentIndex = STEPS.findIndex((step) => step.key === currentStep)
    const previousStep = STEPS[currentIndex - 1]
    if (previousStep) setCurrentStep(previousStep.key)
  }

  const handleAddItem = (item: ReceivingItem) => {
    setItems((prev) => [...prev, item])
  }

  const handleAddItemsFromPlan = (newItems: ReceivingItem[]) => {
    setItems((prev) => [...prev, ...newItems])
  }

  const handleImportComplete = (newItems: ReceivingItem[]) => {
    setItems((prev) => [...prev, ...newItems])
    setIsImportOpen(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleUploadDocument = () => {
    setDocuments((prev) => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        name: `เอกสารแนบ_${prev.length + 1}.pdf`,
        type: "PDF",
        fileSize: "1.0 MB",
        uploadedDate: receivingInfoMock.receivedDate,
      },
    ])
  }

  const handleConfirmReceiving = () => {
    setCompletedSteps((prev) => (prev.includes("confirm") ? prev : [...prev, "confirm"]))
    setIsConfirmed(true)
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden bg-gray-50 p-4">
      <p className="shrink-0 text-sm text-gray-500">บันทึกข้อมูลการรับเข้าครุภัณฑ์จากใบสั่งซื้อ</p>

      <div className="shrink-0">
        <WizardStepTabs
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="min-h-0 flex-1 overflow-auto">
          {currentStep === "receiving-info" && <ReceivingInfoForm info={receivingInfoMock} totalValue={totalValue} />}

          {currentStep === "asset-items" && (
            <ReceivingItemsPanel
              items={items}
              onOpenImportExcel={() => setIsImportOpen(true)}
              onOpenAddItem={() => setIsAddItemOpen(true)}
              onOpenSelectFromPlan={() => setIsSelectPlanOpen(true)}
              onRemoveItem={handleRemoveItem}
            />
          )}

          {currentStep === "documents" && (
            <SupportingDocumentsPanel documents={documents} onUpload={handleUploadDocument} />
          )}

          {currentStep === "confirm" && (
            <ConfirmSummaryPanel
              info={receivingInfoMock}
              items={items}
              documents={documents}
              isConfirmed={isConfirmed}
              onConfirm={handleConfirmReceiving}
            />
          )}
        </div>

        {currentStep !== "confirm" && (
          <div className="shrink-0 overflow-auto">
            <WizardSummarySidebar
              documentNo={receivingInfoMock.documentNo}
              poNumber={receivingInfoMock.poNumber}
              budget={receivingInfoMock.budget}
              totalValue={totalValue}
              steps={STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onBack={handleBack}
              onContinue={handleContinue}
              isBackDisabled={currentStep === STEPS[0].key}
            />
          </div>
        )}
      </div>

      <ImportExcelModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onComplete={handleImportComplete}
      />
      <AddItemModal isOpen={isAddItemOpen} onClose={() => setIsAddItemOpen(false)} onAdd={handleAddItem} />
      <SelectFromPlanModal
        isOpen={isSelectPlanOpen}
        onClose={() => setIsSelectPlanOpen(false)}
        onAddItems={handleAddItemsFromPlan}
      />
    </div>
  )
}
