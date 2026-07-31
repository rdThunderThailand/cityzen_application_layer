import type { DropdownOption } from "@/components/basic/Dropdown"

export interface FilterFieldConfig {
  key: "type" | "status" | "department" | "location" | "fiscalYear"
  label: string
  options: DropdownOption[]
}

const ALL_OPTION: DropdownOption = { value: "ทั้งหมด", label: "ทั้งหมด" }

export const filterFieldsMock: FilterFieldConfig[] = [
  {
    key: "type",
    label: "ประเภทครุภัณฑ์",
    options: [
      ALL_OPTION,
      { value: "ครุภัณฑ์สำนักงาน", label: "ครุภัณฑ์สำนักงาน" },
      { value: "ครุภัณฑ์คอมพิวเตอร์", label: "ครุภัณฑ์คอมพิวเตอร์" },
      { value: "ครุภัณฑ์ไฟฟ้า", label: "ครุภัณฑ์ไฟฟ้า" },
      { value: "ยานพาหนะ", label: "ยานพาหนะ" },
      { value: "ครุภัณฑ์งานบ้านงานครัว", label: "ครุภัณฑ์งานบ้านงานครัว" },
      { value: "ครุภัณฑ์วิทยาศาสตร์", label: "ครุภัณฑ์วิทยาศาสตร์" },
    ],
  },
  {
    key: "status",
    label: "สถานะ",
    options: [
      ALL_OPTION,
      { value: "ใช้งานอยู่", label: "ใช้งานอยู่" },
      { value: "รอซ่อมบำรุง", label: "รอซ่อมบำรุง" },
      { value: "ชำรุด", label: "ชำรุด" },
      { value: "จำหน่ายแล้ว", label: "จำหน่ายแล้ว" },
    ],
  },
  {
    key: "department",
    label: "หน่วยงาน",
    options: [
      ALL_OPTION,
      { value: "สำนักปลัดเทศบาล", label: "สำนักปลัดเทศบาล" },
      { value: "กองคลัง", label: "กองคลัง" },
      { value: "กองช่าง", label: "กองช่าง" },
      { value: "กองการศึกษา", label: "กองการศึกษา" },
      { value: "กองสาธารณสุข", label: "กองสาธารณสุข" },
    ],
  },
  {
    key: "location",
    label: "สถานที่",
    options: [
      ALL_OPTION,
      { value: "อาคารสำนักงาน", label: "อาคารสำนักงาน" },
      { value: "อาคารเรียน", label: "อาคารเรียน" },
      { value: "คลังพัสดุ", label: "คลังพัสดุ" },
      { value: "สนามจอดรถกลาง", label: "สนามจอดรถกลาง" },
    ],
  },
  {
    key: "fiscalYear",
    label: "ปีงบประมาณจัดซื้อ",
    options: [
      ALL_OPTION,
      { value: "2567", label: "2567" },
      { value: "2566", label: "2566" },
      { value: "2565", label: "2565" },
    ],
  },
]
