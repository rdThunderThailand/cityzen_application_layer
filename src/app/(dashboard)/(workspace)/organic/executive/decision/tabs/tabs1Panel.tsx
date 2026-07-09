import CardData from "@/components/dashboard/CardData";
import { cardEventData } from "../../../../../../../../migration/executive/daily-brief/seed_event_data";
import { cardTaskData } from "../../../../../../../../migration/executive/daily-brief/seed_task_data";
import { CardMetricWLineChart } from "@/components/dashboard/CardMetricWLineChart";
import { dataWithinDay } from "../../../../../../../../migration/executive/daily-brief/seed_data_within_day";

export function Tabs1Panel() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <CardData variant="accent" heading={cardEventData.heading} count={cardEventData.count} items={cardEventData.items} className="h-[290px]" />
                <CardData variant="number" heading={cardTaskData.heading} count={cardTaskData.count} items={cardTaskData.items} className="h-[290px]" />
            </div>
            <div className="flex gap-5">
                <CardData variant="accent" heading={cardEventData.heading} count={cardEventData.count} items={cardEventData.items} className="h-[290px]" />
                <CardData variant="number" heading={cardTaskData.heading} count={cardTaskData.count} items={cardTaskData.items} className="h-[290px]" />
            </div>
        </div>
    )
}