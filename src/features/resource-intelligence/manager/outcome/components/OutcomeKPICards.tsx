import React from 'react';
import { Leaf, Cloud, Bitcoin, Utensils, Star } from 'lucide-react';
import { CardMetric } from '@/components/dashboard/CardMetric';

export const OutcomeKPICards = () => {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {/* Card 1 */}
                <CardMetric
                    title="ปริมาณ Organic Waste"
                    value="9,256"
                    unit="kg"
                    icon={Leaf}
                    classNameForIcon="bg-emerald-50 text-emerald-600"
                    subValue={-12}
                    subUnit={<span className="text-slate-400 font-normal">% จากช่วง 1 - 18 มิ.ย. 67</span>}
                    positiveData={false}
                />

                {/* Card 2 */}
                <CardMetric
                    title="Carbon Saving"
                    value="2,314"
                    unit="kgCO₂e"
                    icon={Cloud}
                    classNameForIcon="bg-emerald-50 text-emerald-600"
                    subValue={18}
                    subUnit={<span className="text-slate-400 font-normal">% จากช่วง 1 - 18 มิ.ย. 67</span>}
                />

                {/* Card 3 */}
                <CardMetric
                    title="ต้นทุนการจัดการ"
                    value="186,540"
                    unit="บาท"
                    icon={Bitcoin}
                    classNameForIcon="bg-emerald-50 text-emerald-600"
                    subValue={-15}
                    subUnit={<span className="text-slate-400 font-normal">% จากช่วง 1 - 18 มิ.ย. 67</span>}
                    positiveData={false}
                />

                {/* Card 4 */}
                <CardMetric
                    title="Food Donation"
                    value="1,243"
                    unit="Meals"
                    icon={Utensils}
                    classNameForIcon="bg-emerald-50 text-emerald-600"
                    subValue={22}
                    subUnit={<span className="text-slate-400 font-normal">% จากช่วง 1 - 18 มิ.ย. 67</span>}
                />

                {/* Card 5 */}
                <CardMetric
                    title="Organization Score"
                    value={92}
                    unit="/ 100"
                    icon={Star}
                    classNameForIcon="bg-amber-50 text-amber-500 border border-amber-200"
                    subValue={6}
                    subUnit={<span className="text-slate-400 font-normal">คะแนน</span>}
                    action={
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-1">ระดับ A</span>
                    }
                />

            </div>
        </div>
    );
};
