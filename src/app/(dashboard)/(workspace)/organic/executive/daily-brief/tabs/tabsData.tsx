import { TabItem } from "@/components/global/Tabs";
import { Tabs1Panel } from "./tabs1Panel";

export const executiveTabs: TabItem[] = [
    { value: 'ภาพรวมวันนี้', title: 'ภาพรวมวันนี้', content: () => <Tabs1Panel/> },
    { value: 'สถานการณ์สำคัญ', title: 'สถานการณ์สำคัญ', content: () => 'This is the สถานการณ์สำคัญ tab. Recent actions and events would be listed here.' },
    { value: 'ภารกิจและการดำเนินการ', title: 'ภารกิจและการดำเนินการ', content: () => 'This is the ภารกิจและการดำเนินการ tab. Configuration options would be shown here.' },
    { value: 'ปฏิทินและนัดหมาย', title: 'ปฏิทินและนัดหมาย', content: () => 'This is the ปฏิทินและนัดหมาย tab. Configuration options would be shown here.' },
    { value: 'สื่อประชาสัมพันธ์', title: 'สื่อประชาสัมพันธ์', content: () => 'This is the สื่อประชาสัมพันธ์ tab. Configuration options would be shown here.' },
];