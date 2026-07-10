import React from 'react';

const tabs = [
    { id: 'overview', label: 'ภาพรวมการปฏิบัติการ', active: true },
    { id: 'generator', label: 'Generator', active: false },
    { id: 'pickup', label: 'Pickup & Collection', active: false },
    { id: 'processing', label: 'Processing & Storage', active: false },
    { id: 'fleet', label: 'Fleet & Equipment', active: false },
    { id: 'staff', label: 'Staff', active: false },
    { id: 'vendor', label: 'Vendor', active: false },
];

export const OperationTabs = () => {
    return (
        <div className="flex items-center gap-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pb-3 text-[13px] font-bold whitespace-nowrap transition-colors relative ${
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
