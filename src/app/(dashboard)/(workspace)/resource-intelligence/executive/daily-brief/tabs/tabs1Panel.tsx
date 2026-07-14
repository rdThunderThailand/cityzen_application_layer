import CardData from "@/components/dashboard/CardData";
import CardWMap from "@/components/dashboard/CardWMap";
import { cardEventData } from "../../../../../../../../migration/executive/daily-brief/seed_event_data";
import { cardTaskData } from "../../../../../../../../migration/executive/daily-brief/seed_task_data";
import { CardDataLong } from "@/components/dashboard/CardDataLong";
import { dataWithinDay } from "../../../../../../../../migration/executive/daily-brief/seed_data_within_day";

export function Tabs1Panel() {
    return (
        <div className="h-full flex flex-col min-h-0 gap-5">
            <div className="flex-1 min-h-0 flex gap-4">
                <CardWMap className="w-1/2 h-full shrink-0" />
                <CardData variant="accent" heading={cardEventData.heading} items={cardEventData.items} maxItems={2} className="h-full min-w-0" />
                <CardData variant="number" heading={cardTaskData.heading} items={cardTaskData.items} maxItems={4} className="h-full" />
            </div>
            <div className="shrink-0 flex gap-4">
                <CardDataLong
                    heading="แนวโน้มสำคัญ 24 ชั่วโมงข้างหน้า"
                    items={dataWithinDay}
                    className=""
                />

                <CardData
                    className="w-full lg:w-[270px] shrink-0"
                    variant="time"
                    heading="นัดหมายสำคัญวันนี้"
                    items={[
                        { time: '09:30 น.', title: 'ประชุมติดตามสถานการณ์น้ำ', subtitle: 'ห้องประชุมศาลากลางจังหวัด' },
                        { time: '10:30 น.', title: 'ประชุมคณะกรรมการท่องเที่ยว', subtitle: 'ห้องประชุม 1 ศาลากลางจังหวัด' },
                        { time: '10:30 น.', title: 'ลงพื้นที่ตรวจโครงการก่อสร้าง', subtitle: 'อ.ถลาง จ.ภูเก็ต' },
                    ]}
                />
            </div>
        </div>
    )
}