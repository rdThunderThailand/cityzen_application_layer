import type { TransferAsset } from "./types"

export const selectedAssetsMock: TransferAsset[] = [
  {
    id: "1",
    assetCode: "TMP-6705-0001",
    name: "เครื่องคอมพิวเตอร์ Lenovo รุ่น V15 G4",
    detail: "CPU i5-10420H, RAM 16GB, SSD 512GB",
    unit: "เครื่อง",
    quantity: 1,
    originalValue: 19900,
    assessedValue: 7960,
    condition: "สภาพดี",
  },
  {
    id: "2",
    assetCode: "TMP-6705-0002",
    name: "เครื่องพิมพ์ Brother รุ่น HL-L2365DW",
    detail: "Print / Copy / Scan A4, 30 ppm",
    unit: "เครื่อง",
    quantity: 1,
    originalValue: 6900,
    assessedValue: 1380,
    condition: "ชำรุด",
  },
  {
    id: "3",
    assetCode: "TMP-6705-0005",
    name: "เก้าอี้สำนักงาน รุ่น C-12",
    detail: "หนังเทียม ขาเหล็ก",
    unit: "ตัว",
    quantity: 1,
    originalValue: 2350,
    assessedValue: 705,
    condition: "ชำรุด",
  },
]
