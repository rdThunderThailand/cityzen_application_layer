import React from 'react';
import { Send, Users, MailOpen, Forward, Heart, AlertTriangle, ArrowRight } from 'lucide-react';
import { CardMetric } from '@/components/dashboard/CardMetric';

export const CommunicationKPICards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {/* Card 1 */}
            <CardMetric
                title="ข้อความที่ส่งวันนี้"
                value={5}
                unit="ข้อความ"
                icon={Send}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subUnit={<span className="text-slate-400 font-normal">ถึง 3 กลุ่มเป้าหมาย</span>}
            />

            {/* Card 2 */}
            <CardMetric
                title="ผู้รับสารรวม"
                value={256}
                unit="คน"
                icon={Users}
                classNameForIcon="bg-blue-50 text-blue-500"
                subUnit={<span className="text-slate-400 font-normal">เพิ่มขึ้น 8% จากเมื่อวาน</span>}
            />

            {/* Card 3 */}
            <CardMetric
                title="เปิดอ่านแล้ว"
                value={178}
                unit="คน"
                icon={MailOpen}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subUnit={<span className="text-slate-400 font-normal">69%</span>}
            />

            {/* Card 4 */}
            <CardMetric
                title="การมีส่วนร่วม"
                value={82}
                unit="คน"
                icon={Forward}
                classNameForIcon="bg-orange-50 text-orange-500"
                subUnit={<span className="text-slate-400 font-normal">32%</span>}
            />

            {/* Card 5 */}
            <CardMetric
                title="ความพึงพอใจ"
                value={4.6}
                unit="/ 5"
                icon={Heart}
                classNameForIcon="bg-purple-50 text-purple-500"
                subUnit={<span className="text-slate-400 font-normal">จากการตอบกลับ</span>}
            />

            {/* Card 6 */}
            <CardMetric
                title="การแจ้งเตือนสำคัญ"
                value={2}
                unit="ข้อความ"
                icon={AlertTriangle}
                classNameForIcon="bg-rose-50 text-rose-500"
                action={
                    <button className="flex items-center gap-1 text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors">
                        ดูรายละเอียด
                        <ArrowRight className="w-3 h-3" />
                    </button>
                }
            />
        </div>
    );
};
