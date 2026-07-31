"use client"

import { useMemo, useState } from "react"

import { AddAssetModal } from "./component/AddAssetModal"
import { AssetItemsPanel } from "./component/AssetItemsPanel"
import { ConfirmReviewPanel } from "./component/ConfirmReviewPanel"
import { DocumentInfoForm } from "./component/DocumentInfoForm"
import { SupportingDocumentsPanel } from "./component/SupportingDocumentsPanel"
import { WizardStepTabs, type WizardStepConfig } from "./component/WizardStepTabs"
import { WizardSummarySidebar } from "./component/WizardSummarySidebar"
import { availableAssetsMock } from "./mock/availableAssets.mock"
import { requiredDocumentSlotsMock } from "./mock/requiredDocuments.mock"
import { selectedAssetsMock } from "./mock/selectedAssets.mock"
import { transferDisposalInfoMock } from "./mock/transferDisposalInfo.mock"
import type { TransactionType, TransferAsset, UploadedDocument, WizardStepKey } from "./mock/types"
import { uploadedDocumentsMock } from "./mock/uploadedDocuments.mock"

const STEPS: WizardStepConfig[] = [
  { key: "document-info", label: "ข้อมูลเอกสาร" },
  { key: "asset-items", label: "รายการครุภัณฑ์" },
  { key: "documents", label: "เอกสารประกอบ" },
  { key: "confirm", label: "ตรวจสอบและบันทึก" },
]

const CONTINUE_LABEL: Record<Exclude<WizardStepKey, "confirm">, string> = {
  "document-info": "ถัดไป: รายการครุภัณฑ์",
  "asset-items": "ถัดไป: เอกสารประกอบ",
  documents: "ถัดไป: ตรวจสอบและบันทึก",
}

const TIP_TEXT: Record<WizardStepKey, string> = {
  "document-info": "กรุณาระบุข้อมูลเอกสารและเลือกครุภัณฑ์ที่ต้องการให้ครบถ้วน",
  "asset-items": "ตรวจสอบรายการครุภัณฑ์และสภาพให้ถูกต้องก่อนดำเนินการต่อ",
  documents: "กรุณาแนบเอกสารสำคัญให้ครบถ้วนก่อนดำเนินการต่อ",
  confirm: "กรุณาตรวจสอบความถูกต้อง ก่อนบันทึกข้อมูลให้ครบถ้วน",
}

export default function TransferDisposalClient() {
  const [info, setInfo] = useState(transferDisposalInfoMock)
  const [currentStep, setCurrentStep] = useState<WizardStepKey>("document-info")
  const [completedSteps, setCompletedSteps] = useState<WizardStepKey[]>([])
  const [isConfirmed, setIsConfirmed] = useState(false)

  const [pickedAssetIds, setPickedAssetIds] = useState<string[]>(["1", "2", "5"])
  const [items, setItems] = useState<TransferAsset[]>(selectedAssetsMock)
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])
  const [documents, setDocuments] = useState<UploadedDocument[]>(uploadedDocumentsMock)

  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false)

  const totalAssessedValue = useMemo(() => items.reduce((sum, item) => sum + item.assessedValue, 0), [items])

  const handleChangeTransactionType = (type: TransactionType) => {
    setInfo((prev) => ({ ...prev, transactionType: type }))
  }

  const handleTogglePickedAsset = (id: string) => {
    setPickedAssetIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleToggleItemSelected = (id: string) => {
    setSelectedItemIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleToggleSelectAllItems = () => {
    setSelectedItemIds((prev) => (prev.length === items.length ? [] : items.map((item) => item.id)))
  }

  const handleAddAsset = (asset: TransferAsset) => {
    setItems((prev) => [...prev, asset])
  }

  const handleRemoveSelectedItems = () => {
    setItems((prev) => prev.filter((item) => !selectedItemIds.includes(item.id)))
    setSelectedItemIds([])
  }

  const handleUploadDocument = (slotId: string) => {
    if (!slotId) return
    const slot = requiredDocumentSlotsMock.find((item) => item.id === slotId)
    if (!slot) return

    setDocuments((prev) => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        requiredDocId: slot.id,
        name: slot.label,
        fileName: `${slot.id}_${info.documentNo}.pdf`,
        uploadedDate: info.actionDate,
        fileSize: "1.0 MB",
      },
    ])
  }

  const handleRemoveDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
  }

  const handleConfirmSave = () => {
    setCompletedSteps((prev) => (prev.includes("confirm") ? prev : [...prev, "confirm"]))
    setIsConfirmed(true)
  }

  const handleContinue = () => {
    if (currentStep === "confirm") {
      handleConfirmSave()
      return
    }

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

  // บันทึกร่าง: demo stub เท่านั้น ยังไม่ต่อกับ backend การบันทึกจริง
  const handleSaveDraft = () => {}

  const continueLabel = currentStep === "confirm" ? `บันทึกข้อมูล${info.transactionType}` : CONTINUE_LABEL[currentStep]

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div>
        <p className="text-xs text-gray-400">โอนย้าย / จำหน่าย &gt; สร้างรายการ</p>
        <p className="mt-1 text-sm text-gray-500">บันทึกรายการโอนย้ายหรือจำหน่ายครุภัณฑ์</p>
      </div>

      <div className="mt-6">
        <WizardStepTabs
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          {currentStep === "document-info" && (
            <DocumentInfoForm
              info={info}
              onChangeTransactionType={handleChangeTransactionType}
              availableAssets={availableAssetsMock}
              selectedAssetIds={pickedAssetIds}
              onToggleAsset={handleTogglePickedAsset}
              totalAssessedValue={totalAssessedValue}
            />
          )}

          {currentStep === "asset-items" && (
            <AssetItemsPanel
              items={items}
              selectedIds={selectedItemIds}
              onToggleSelected={handleToggleItemSelected}
              onToggleSelectAll={handleToggleSelectAllItems}
              onOpenAddAsset={() => setIsAddAssetOpen(true)}
              onRemoveSelected={handleRemoveSelectedItems}
            />
          )}

          {currentStep === "documents" && (
            <SupportingDocumentsPanel
              requiredSlots={requiredDocumentSlotsMock}
              uploadedDocuments={documents}
              onUpload={handleUploadDocument}
              onRemove={handleRemoveDocument}
            />
          )}

          {currentStep === "confirm" && (
            <ConfirmReviewPanel
              info={info}
              items={items}
              uploadedDocuments={documents}
              isConfirmed={isConfirmed}
              onConfirm={handleConfirmSave}
            />
          )}
        </div>

        {!isConfirmed && (
          <WizardSummarySidebar
            info={info}
            itemCount={items.length}
            totalAssessedValue={totalAssessedValue}
            onBack={handleBack}
            onContinue={handleContinue}
            onSaveDraft={handleSaveDraft}
            continueLabel={continueLabel}
            isBackDisabled={currentStep === STEPS[0].key}
            tipText={TIP_TEXT[currentStep]}
          />
        )}
      </div>

      <AddAssetModal isOpen={isAddAssetOpen} onClose={() => setIsAddAssetOpen(false)} onAdd={handleAddAsset} />
    </main>
  )
}
