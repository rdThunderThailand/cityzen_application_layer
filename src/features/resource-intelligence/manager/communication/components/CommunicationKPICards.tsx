import React from 'react';
import { Send, Users, MailOpen, Forward, Heart, AlertTriangle, ArrowRight } from 'lucide-react';

export const CommunicationKPICards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">ข้อความที่ส่งวันนี้</span>
                    <Send className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">5</span>
                        <span className="text-[11px] font-semibold text-slate-600">ข้อความ</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[9px] text-slate-400">ถึง 3 กลุ่มเป้าหมาย</span>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">ผู้รับสารรวม</span>
                    <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">256</span>
                        <span className="text-[11px] font-semibold text-slate-600">คน</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[9px] text-slate-400">เพิ่มขึ้น 8% จากเมื่อวาน</span>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">เปิดอ่านแล้ว</span>
                    <MailOpen className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">178</span>
                        <span className="text-[11px] font-semibold text-slate-600">คน</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[9px] text-slate-400">69%</span>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">การมีส่วนร่วม</span>
                    <Forward className="w-4 h-4 text-orange-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">82</span>
                        <span className="text-[11px] font-semibold text-slate-600">คน</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[9px] text-slate-400">32%</span>
                </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">ความพึงพอใจ</span>
                    <Heart className="w-4 h-4 text-purple-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">4.6</span>
                        <span className="text-[11px] font-semibold text-slate-600">/ 5</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[9px] text-slate-400">จากการตอบกลับ</span>
                </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-700">การแจ้งเตือนสำคัญ</span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">2</span>
                        <span className="text-[11px] font-semibold text-slate-600">ข้อความ</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="flex items-center gap-1 text-[9px] font-bold text-rose-600 hover:text-rose-700 transition-colors">
                        ดูรายละเอียด
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};
