export type AssetStatus = "ใช้งานอยู่" | "รอซ่อมบำรุง" | "ชำรุด" | "จำหน่ายแล้ว"

export type AssetIconKey = "box" | "car" | "ac" | "computer" | "cabinet" | "mower" | "sprayer" | "camera"

export type StatIconKey = "total" | "available" | "repair" | "damaged" | "disposed"

export type StatColorTheme = "blue" | "green" | "orange" | "purple" | "red"

export interface Asset {
  id: string
  name: string
  detail: string
  icon: AssetIconKey
  type: string
  department: string
  location: string
  purchaseDate: string
  value: number
  status: AssetStatus
}

export interface StatSummary {
  key: string
  label: string
  value: number
  percent?: string
  icon: StatIconKey
  colorTheme: StatColorTheme
}
