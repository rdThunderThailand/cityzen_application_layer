import CardData from "@/components/dashboard/CardData";
import CardWMap from "@/components/dashboard/CardWMap";
import { cardEventData } from "../../../../../../../../migration/seed_event_data";
import { cardTaskData } from "../../../../../../../../migration/seed_task_data";
import { CardMetricWLineChart } from "@/components/dashboard/CardMetricWLineChart";
import { withinDayData } from "../../../../../../../../migration/seed_data_within_day";

export function Tabs1Panel (){
    return(
        <div className="">
            <div className="flex gap-4">
                <CardWMap className="h-[290px]"/>
                <CardData variant="accent" heading={cardEventData.heading} count={cardEventData.count} items={cardEventData.items} className="h-[290px]"/>
                <CardData variant="number" heading={cardTaskData.heading} count={cardTaskData.count} items={cardTaskData.items} className="h-[290px]"/>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-slate-100 rounded-xl shadow-sm w-full font-sans bg-white my-5">
                <h1 className="font-bold text-[15px]">แนวโน้มสำคัญ 24 ชั่วโมงข้างหน้า</h1>
                <div className="flex">
                    <div className="w-full bg-red-400 flex">
                        {withinDayData.map((item, index) => (
                            <CardMetricWLineChart key={index} {...item} className="bg-white hover:shadow-md"/>
                        ))}
                    </div>
                    <CardData
                        className="w-[270px]"
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
        </div>
    )
}