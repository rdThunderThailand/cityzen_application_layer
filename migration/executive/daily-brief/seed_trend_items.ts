import { TrendItemProps } from "@/components/dashboard/CardTrend";

export const headerTrendItems: TrendItemProps[] = [
  { label: "ความพร้อมรับมือ", direction: "up", value: "8%", sentiment: "positive", showPlus: true },
  { label: "ความปลอดภัย", direction: "down", value: "3%", sentiment: "negative" },
  { label: "เศรษฐกิจ/ท่องเที่ยว", direction: "up", value: "12%", sentiment: "positive" },
  { label: "คุณภาพชีวิต", direction: "up", value: "5%", sentiment: "positive" },
]