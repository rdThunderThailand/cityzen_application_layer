import React, { useState } from 'react';

export const OutcomeTabs = () => {
    const [activeTab, setActiveTab] = useState('ภาพรวม');
    
    const tabs = [
        'ภาพรวม',
        'แนวโน้ม',
        'เปรียบเทียบ',
        'ประสิทธิภาพ',
        'สิ่งแวดล้อม',
        'สังคม',
        'เศรษฐกิจ'
    ];

    return (
        <div className="flex gap-8 border-b border-slate-200 mb-6 px-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[13px] font-bold transition-colors relative ${
                        activeTab === tab
                            ? 'text-emerald-600'
                            : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></span>
                    )}
                </button>
            ))}
        </div>
    );
};
