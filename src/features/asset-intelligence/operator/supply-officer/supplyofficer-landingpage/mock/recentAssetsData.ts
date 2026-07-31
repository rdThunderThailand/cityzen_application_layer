export type AssetStatus = "พร้อมใช้งาน" | "อยู่ระหว่างซ่อม" | "รอจำหน่าย" | "ชำรุด"

export interface RecentAssetData {
  id: string
  assetCode: string
  assetName: string
  category: string
  receivedDate: string
  value: number
  status: AssetStatus
}

export const recentAssetsData: RecentAssetData[] = [
  {
    id: "1",
    assetCode: "AS-6705-00098",
    assetName: "โต๊ะทำงาน 4 ลิ้นชัก",
    category: "ครุภัณฑ์สำนักงาน",
    receivedDate: "20 พ.ค. 2567",
    value: 4500.0,
    status: "พร้อมใช้งาน",
  },
  {
    id: "2",
    assetCode: "VE-6705-00023",
    assetName: "รถกระบะ Toyota Revo",
    category: "ยานพาหนะ",
    receivedDate: "18 พ.ค. 2567",
    value: 795000.0,
    status: "พร้อมใช้งาน",
  },
  {
    id: "3",
    assetCode: "EL-6705-00111",
    assetName: "เครื่องปรับอากาศ 24,000 BTU",
    category: "ครุภัณฑ์ไฟฟ้า",
    receivedDate: "17 พ.ค. 2567",
    value: 28900.0,
    status: "พร้อมใช้งาน",
  },
  {
    id: "4",
    assetCode: "TO-6705-00044",
    assetName: "เครื่องตัดหญ้าแบบสะพาย",
    category: "เครื่องมือ/เครื่องจักร",
    receivedDate: "16 พ.ค. 2567",
    value: 12500.0,
    status: "พร้อมใช้งาน",
  },
  {
    id: "5",
    assetCode: "AS-6705-00097",
    assetName: "เก้าอี้สำนักงาน",
    category: "ครุภัณฑ์สำนักงาน",
    receivedDate: "15 พ.ค. 2567",
    value: 1800.0,
    status: "พร้อมใช้งาน",
  },
]
