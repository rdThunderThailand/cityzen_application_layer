import React from 'react';

export const OperationProcessingStorage = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-[13px] font-bold text-slate-800 mb-4">การประมวลผล & การจัดเก็บ</h3>
            
            <div className="grid grid-cols-4 gap-4">
                {/* Col 1 */}
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700 mb-1">เครื่องย่อยเศษอาหาร</span>
                    <span className="text-[9px] text-slate-400 mb-3">ทำงานปกติ</span>
                    
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[9px] text-slate-500">วันนี้</span>
                        <span className="text-[9px] text-slate-500">กำลังการผลิต</span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-1.5">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[13px] font-bold text-slate-800">312</span>
                            <span className="text-[9px] font-bold text-slate-600">kg</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">65%</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700 mb-1">ถังหมัก (Composter)</span>
                    <span className="text-[9px] text-slate-400 mb-3">ทำงานปกติ</span>
                    
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[9px] text-slate-500">ปริมาณรับเข้า</span>
                        <span className="text-[9px] text-slate-500">ความจุ</span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-1.5">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[13px] font-bold text-slate-800">420</span>
                            <span className="text-[9px] font-bold text-slate-600">kg</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">70%</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                </div>

                {/* Col 3 */}
                <div className="flex flex-col border-l border-slate-100 pl-4">
                    <span className="text-[11px] font-bold text-slate-700 mb-1">การจัดเก็บปุ๋ย</span>
                    <span className="text-[9px] text-slate-400 mb-3">พร้อมใช้งาน</span>
                    
                    <div className="flex flex-col justify-end h-full mb-1.5">
                        <span className="text-[9px] text-slate-500 mb-1">สต๊อกปุ๋ย</span>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[13px] font-bold text-slate-800">1,240</span>
                            <span className="text-[9px] font-bold text-slate-600">kg</span>
                        </div>
                    </div>
                </div>

                {/* Col 4 */}
                <div className="flex flex-col border-l border-slate-100 pl-4">
                    <span className="text-[11px] font-bold text-slate-700 mb-1">พื้นที่จัดเก็บ</span>
                    <span className="text-[9px] text-slate-400 mb-3">ปกติ</span>
                    
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[9px] text-slate-500">การใช้พื้นที่</span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[13px] font-bold text-slate-800">72%</span>
                        <span className="text-[9px] text-slate-500">ความจุ 2,000 kg</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
