import { TabItem } from "@/components/basic/Tabs";
import { Tabs1Panel } from "./tabs1Panel";
import { decisionItemData } from "../../../../../../../../migration/executive/decision/seed_decision_items";


export const decisionPageTabs: TabItem[] = [
    { value: 'เรื่องเพื่อการตัดสินใจ', title: 'เรื่องเพื่อการตัดสินใจ', count: decisionItemData.items.length, content: () => <Tabs1Panel /> },
    { value: 'อนุมัติแล้ว', title: 'อนุมัติแล้ว', count: 4, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'อยู่ระหว่างดำเนินการ', title: 'อยู่ระหว่างดำเนินการ', count: 3, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'ติดตามผล', title: 'ติดตามผล', count: 8, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'ทั้งหมด', title: 'ทั้งหมด', content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
];
