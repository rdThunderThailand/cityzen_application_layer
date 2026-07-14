import React from 'react';

const tabs = [
    { id: 'latest', label: 'สื่อสารล่าสุด', active: true },
    { id: 'schedule', label: 'กำหนดการสื่อสาร', active: false },
    { id: 'audience', label: 'กลุ่มเป้าหมาย', active: false },
    { id: 'templates', label: 'เทมเพลตข้อความ', active: false },
];

export const CommunicationTabs = () => {
    return (
        <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pb-3 text-[13px] font-bold transition-colors relative ${
                        tab.active 
                        ? 'text-emerald-600' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab.label}
                    {tab.active && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600"></div>
                    )}
                </button>
            ))}
        </div>
    );
};
