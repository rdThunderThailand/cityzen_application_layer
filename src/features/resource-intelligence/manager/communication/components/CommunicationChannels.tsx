import React from 'react';
import { MessageCircle, Smartphone, Mail, Megaphone, ArrowRight } from 'lucide-react';
import { CommunicationMessageDetailsProps } from './CommunicationMessageDetails';

export const CommunicationChannels = ({isOpenAIDropdown}: CommunicationMessageDetailsProps) => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full flex flex-col justify-between">
            <h3 className="text-[13px] font-bold text-slate-800 mb-4">ช่องทางการสื่อสาร</h3>

            <div className="flex flex-col gap-5 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                        <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-700 truncate">LINE OA (Broadcast)</span>
                    </div>
                    <div className="flex items-center gap-3 w-1/2 justify-end">
                        {!isOpenAIDropdown && <span className="text-[10px] text-slate-500 w-10 text-right">18 คน</span>}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 w-6 text-right">75%</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                        <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center shrink-0">
                            <Smartphone className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-700 truncate">แอปพนักงาน (CityZen App)</span>
                    </div>
                    <div className="flex items-center gap-3 w-1/2 justify-end">
                        {!isOpenAIDropdown && <span className="text-[10px] text-slate-500 w-10 text-right">16 คน</span>}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 w-6 text-right">67%</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                        <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                            <Mail className="w-3 h-3 text-slate-600" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-700 truncate">อีเมล (Email)</span>
                    </div>
                    <div className="flex items-center gap-3 w-1/2 justify-end">
                        {!isOpenAIDropdown && <span className="text-[10px] text-slate-500 w-10 text-right">12 คน</span>}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 w-6 text-right">50%</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                        <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                            <Megaphone className="w-3 h-3 text-slate-600" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-700 truncate">ประกาศหน้าบอร์ด</span>
                    </div>
                    <div className="flex items-center gap-3 w-1/2 justify-end">
                        {!isOpenAIDropdown && <span className="text-[10px] text-slate-500 w-10 text-right">10 คน</span>}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 w-6 text-right">42%</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-2 border-t border-slate-50 pt-4">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูประสิทธิภาพช่องทาง
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
