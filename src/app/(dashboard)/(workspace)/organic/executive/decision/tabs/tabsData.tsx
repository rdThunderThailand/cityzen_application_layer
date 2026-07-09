import { TabItem } from "@/components/basic/Tabs";
import { Tabs1Panel } from "./tabs1Panel";


export const decisionTabs: TabItem[] = [
    { value: 'เรื่องเพื่อการตัดสินใจ', title: 'เรื่องเพื่อการตัดสินใจ', count: 6, content: () => <Tabs1Panel /> },
    { value: 'อนุมัติแล้ว', title: 'อนุมัติแล้ว', count: 4, content: () => 'Approved items panel content' },
    { value: 'อยู่ระหว่างดำเนินการ', title: 'อยู่ระหว่างดำเนินการ', count: 3, content: () => 'In progress items panel content' },
    { value: 'ติดตามผล', title: 'ติดตามผล', count: 8, content: () => 'Follow-up items panel content' },
    { value: 'ทั้งหมด', title: 'ทั้งหมด', content: () => 'All items panel content' },
];
