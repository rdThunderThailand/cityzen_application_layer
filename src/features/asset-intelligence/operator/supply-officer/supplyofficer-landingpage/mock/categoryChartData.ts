export interface AssetCategoryDatum {
  id: string
  label: string
  value: number
  percentage: number
  color: string
}

export const categoryChartTotal = 5246

export const categoryChartData: AssetCategoryDatum[] = [
  { id: "office", label: "ครุภัณฑ์สำนักงาน", value: 2182, percentage: 41.6, color: "#3B82F6" },
  { id: "vehicle", label: "ยานพาหนะ", value: 1025, percentage: 19.5, color: "#22C55E" },
  { id: "electronics", label: "ครุภัณฑ์ไฟฟ้า/อิเล็กทรอนิกส์", value: 842, percentage: 16.1, color: "#F59E0B" },
  { id: "machinery", label: "เครื่องจักร/เครื่องมือ", value: 612, percentage: 11.7, color: "#8B5CF6" },
  { id: "infrastructure", label: "ครุภัณฑ์โครงสร้างพื้นฐาน", value: 381, percentage: 7.2, color: "#EC4899" },
  { id: "others", label: "อื่นๆ", value: 204, percentage: 3.9, color: "#94A3B8" },
]
