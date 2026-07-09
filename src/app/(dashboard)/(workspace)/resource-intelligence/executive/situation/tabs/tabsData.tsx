import { TabItem } from "@/components/basic/Tabs";
import { Tabs1Panel } from "./tabs1Panel";

export const situationTabs: TabItem[] = [
    { value: 'ภาพรวมสถานการณ์', title: 'ภาพรวมสถานการณ์', content: () => <Tabs1Panel /> },
    { value: 'ภัยธรรมชาติ', title: 'ภัยธรรมชาติ', content: () => 'Natural disasters panel content' },
    { value: 'อุบัติเหตุและสาธารณภัย', title: 'อุบัติเหตุและสาธารณภัย', content: () => 'Accidents and public hazards panel content' },
    { value: 'สาธารณสุข', title: 'สาธารณสุข', content: () => 'Public health panel content' },
    { value: 'เศรษฐกิจและสังคม', title: 'เศรษฐกิจและสังคม', content: () => 'Socio-economic panel content' },
    { value: 'ความมั่นคง', title: 'ความมั่นคง', content: () => 'Security panel content' },
    { value: 'สิ่งแวดล้อม', title: 'สิ่งแวดล้อม', content: () => 'Environment panel content' },
];