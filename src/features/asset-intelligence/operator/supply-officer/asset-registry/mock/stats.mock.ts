import type { StatSummary } from "./types"

export const statsMock: StatSummary[] = [
  {
    key: "total",
    label: "ครุภัณฑ์ทั้งหมด",
    value: 5246,
    icon: "total",
    colorTheme: "blue",
  },
  {
    key: "available",
    label: "ใช้งานได้",
    value: 4312,
    percent: "82.31% ของทั้งหมด",
    icon: "available",
    colorTheme: "green",
  },
  {
    key: "repair",
    label: "รอซ่อมบำรุง",
    value: 152,
    percent: "2.90% ของทั้งหมด",
    icon: "repair",
    colorTheme: "orange",
  },
  {
    key: "damaged",
    label: "ชำรุด",
    value: 28,
    percent: "0.53% ของทั้งหมด",
    icon: "damaged",
    colorTheme: "purple",
  },
  {
    key: "disposed",
    label: "จำหน่ายแล้ว",
    value: 754,
    percent: "14.36% ของทั้งหมด",
    icon: "disposed",
    colorTheme: "red",
  },
]
