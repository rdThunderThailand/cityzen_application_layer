import React from 'react';
import { Users, UserX, UserMinus, User, Cog, Recycle, Search, Building2, Package, Archive, ArrowRight, Snowflake } from 'lucide-react';

export const OperationBottomStatuses = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {/* สถานะเจ้าหน้าที่ */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-bold text-slate-800">สถานะเจ้าหน้าที่</h3>
                    <button className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        ดูทั้งหมด
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">18</span>
                        <span className="text-[9px] text-slate-500">ปฏิบัติงาน</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">2</span>
                        <span className="text-[9px] text-slate-500">ขอประจำจุด</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center">
                            <UserMinus className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">1</span>
                        <span className="text-[9px] text-slate-500">ลาพัก</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                            <UserX className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">1</span>
                        <span className="text-[9px] text-slate-500">ไม่ระบุ</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-50 pt-3">
                    <span className="text-[10px] font-bold text-slate-700">กะงานวันนี้</span>
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">กะเช้า (06:00 - 14:00)</span>
                        <span className="font-bold text-slate-700">12 คน</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">กะบ่าย (14:00 - 22:00)</span>
                        <span className="font-bold text-slate-700">10 คน</span>
                    </div>
                </div>
            </div>

            {/* สถานะอุปกรณ์ */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-bold text-slate-800">สถานะอุปกรณ์</h3>
                    <button className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        ดูทั้งหมด
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Cog className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-medium text-slate-700">เครื่องย่อยสลายเศษอาหาร</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">ปกติ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Recycle className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-medium text-slate-700">เครื่องบดย่อย</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">ปกติ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-medium text-slate-700">เครื่องชั่งน้ำหนัก</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">ปกติ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Archive className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-medium text-slate-700">รถเข็นเก็บขยะ</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">ปกติ 15 / 15</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Archive className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-medium text-slate-700">ถังขยะ</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">ปกติ 120 / 120</span>
                    </div>
                </div>
            </div>

            {/* สถานะพื้นที่จัดเก็บ */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-bold text-slate-800">สถานะพื้นที่จัดเก็บ</h3>
                    <button className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        ดูทั้งหมด
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/2">
                            <Snowflake className="w-4 h-4 text-blue-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-slate-700">Cold Room</span>
                                <span className="text-[8px] text-slate-400">อุณหภูมิ 4°C</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2 justify-end">
                            <span className="text-[10px] font-bold text-slate-800 w-8 text-right">60%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/2">
                            <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-slate-700">Dry Storage</span>
                                <span className="text-[8px] text-slate-400">ปกติ</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2 justify-end">
                            <span className="text-[10px] font-bold text-slate-800 w-8 text-right">45%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/2">
                            <Package className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-slate-700">Organic Bin</span>
                                <span className="text-[8px] text-slate-400">ปกติ</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2 justify-end">
                            <span className="text-[10px] font-bold text-slate-800 w-8 text-right">85%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/2">
                            <Recycle className="w-4 h-4 text-blue-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-slate-700">Recycling Area</span>
                                <span className="text-[8px] text-slate-400">ปกติ</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2 justify-end">
                            <span className="text-[10px] font-bold text-slate-800 w-8 text-right">30%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
