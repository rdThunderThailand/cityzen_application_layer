import React from 'react';
import { Megaphone, AlertCircle, BarChart3, Clock, Heart, ArrowRight } from 'lucide-react';

const messageData = [
    { 
        id: 1, 
        icon: Megaphone, 
        iconColor: 'text-rose-500', 
        title: 'แจ้งเตือนรอบเก็บ Organic Waste', 
        tag: 'สำคัญ', 
        tagColor: 'bg-rose-50 text-rose-600',
        time: 'วันนี้ 08:00 น. • ถึง 24 คน', 
        readCount: 20, 
        percent: 83,
        active: true
    },
    { 
        id: 2, 
        icon: AlertCircle, 
        iconColor: 'text-amber-500', 
        title: 'ขอความร่วมมือลดขยะอาหาร (Food Waste)', 
        time: 'เมื่อวาน 16:30 น. • ถึง 18 คน', 
        readCount: 14, 
        percent: 78,
        active: false
    },
    { 
        id: 3, 
        icon: BarChart3, 
        iconColor: 'text-blue-500', 
        title: 'สรุปผลการบริหารจัดการประจำสัปดาห์', 
        time: '17 ก.ค. 2567, 10:15 น. • ถึง 12 คน', 
        readCount: 10, 
        percent: 83,
        active: false
    },
    { 
        id: 4, 
        icon: Clock, 
        iconColor: 'text-emerald-500', 
        title: 'แจ้งเปลี่ยนเวลารถเก็บขยะวันนี้', 
        time: '17 ก.ค. 2567, 07:45 น. • ถึง 24 คน', 
        readCount: 22, 
        percent: 92,
        active: false
    },
    { 
        id: 5, 
        icon: Heart, 
        iconColor: 'text-purple-500', 
        title: 'ขอบคุณทีมงานที่ช่วยลดขยะได้ดีเยี่ยม', 
        time: '16 ก.ค. 2567, 18:00 น. • ถึง 28 คน', 
        readCount: 25, 
        percent: 89,
        active: false
    },
];

export const CommunicationMessageList = () => {
    return (
        <div className="flex flex-col gap-3">
            {messageData.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors shadow-sm ${
                        msg.active 
                        ? 'bg-white border-emerald-500' 
                        : 'bg-white border-slate-100 hover:border-emerald-200'
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`mt-1 ${msg.iconColor}`}>
                            <msg.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-slate-800">{msg.title}</span>
                                {msg.tag && (
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${msg.tagColor}`}>
                                        {msg.tag}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium text-slate-400">{msg.time}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] text-slate-400">เปิดอ่าน</span>
                            <span className="text-[13px] font-bold text-slate-800">{msg.readCount}</span>
                        </div>
                        
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-slate-100"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-emerald-500"
                                    strokeDasharray={`${msg.percent}, 100`}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute flex items-center justify-center inset-0">
                                <span className="text-[9px] font-bold text-emerald-600">{msg.percent}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* <div className="flex justify-end mt-2">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูทั้งหมด
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div> */}
        </div>
    );
};
