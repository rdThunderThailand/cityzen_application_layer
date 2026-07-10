import React from 'react';
import { AlertTriangle, Clock, Info, Check, X, ArrowRight } from 'lucide-react';

const decisionItems = [
    {
        id: 1,
        title: "อนุมัติจัดเตรียมเก็บขยะเพิ่ม (เวลา 13:00 น.)",
        subtitle: "ปริมาณขยะอินทรีย์เพิ่มขึ้น 14% แนะนำให้เพิ่มรอบเก็บเพื่อป้องกันการสะสม",
        type: 'urgent',
        typeLabel: 'เร่งด่วน',
        icon: AlertTriangle,
        iconColor: 'text-rose-500',
        iconBg: 'bg-rose-50',
        value: "12,000 บาท",
        requester: "หัวหน้าแผนกแม่บ้าน",
        dueDate: "วันนี้ 10:00 น.",
        impact: "สูง",
        impactColor: "text-rose-600 bg-rose-50"
    },
    {
        id: 2,
        title: "อนุมัติจัดซื้อถังขยะอินทรีย์เพิ่ม 10 ใบ",
        subtitle: "สำหรับโซน Restaurant และ Banquet Hall",
        type: 'important',
        typeLabel: 'สำคัญ',
        icon: Clock,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-50',
        value: "18,000 บาท",
        requester: "วิศวกรอาคาร",
        dueDate: "วันนี้ 12:00 น.",
        impact: "กลาง",
        impactColor: "text-amber-600 bg-amber-50"
    },
    {
        id: 3,
        title: "อนุมัติงบประมาณ Food Donation สัปดาห์นี้",
        subtitle: "ส่งต่ออาหารส่วนเกินให้มูลนิธิ 120 Meals",
        type: 'important',
        typeLabel: 'สำคัญ',
        icon: Clock,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-50',
        value: "6,000 บาท",
        requester: "หัวหน้าแผนกครัว",
        dueDate: "วันนี้ 14:00 น.",
        impact: "กลาง",
        impactColor: "text-amber-600 bg-amber-50"
    }
];

export const DecisionList = () => {
    return (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0">
            {decisionItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 flex items-start gap-5 hover:border-blue-100 transition-colors cursor-pointer group">
                    {/* Priority Icon */}
                    <div className="flex flex-col items-center gap-1.5 min-w-[50px] pt-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}>
                            <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <span className={`text-[9px] font-bold ${item.iconColor}`}>{item.typeLabel}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col pt-1">
                        <h3 className="text-[13px] font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 mb-4">{item.subtitle}</p>

                        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 mb-0.5">มูลค่า</span>
                                <span className="text-[11px] font-bold text-slate-700">{item.value}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 mb-0.5">ผู้ขอ</span>
                                <span className="text-[11px] font-semibold text-slate-600">{item.requester}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 mb-0.5">กำหนดเสร็จ</span>
                                <span className="text-[11px] font-semibold text-slate-600">{item.dueDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Impact & Actions */}
                    <div className="flex items-center gap-6 pt-1">
                        <div className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] text-slate-400">ผลกระทบ</span>
                            <div className={`px-4 py-1 rounded font-bold text-[11px] ${item.impactColor}`}>
                                {item.impact}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm w-[90px]">
                                <Check className="w-3.5 h-3.5" /> อนุมัติ
                            </button>
                            <button className="flex items-center justify-center text-[10px] font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 px-4 py-1.5 rounded-lg transition-colors w-[90px]">
                                ดูรายละเอียด
                            </button>
                            <button className="flex items-center justify-center gap-1.5 text-rose-500 hover:bg-rose-50 text-[10px] font-semibold px-4 py-1 rounded-lg transition-colors w-[90px] mt-0.5">
                                <X className="w-3.5 h-3.5" /> ปฏิเสธ
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center mt-4 mb-4">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูเรื่องที่ต้องตัดสินใจทั้งหมด
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
