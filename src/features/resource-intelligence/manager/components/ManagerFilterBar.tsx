"use client";

import { useState } from "react";
import { Building2, Calendar, Clock, ChevronDown } from "lucide-react";
import { AIDropdown } from "@/components/basic/AIDropdown";

interface ManagerFilterBarProps {
    activeAI: string | null;
    onAIChange: (value: string | null) => void;
}

export const ManagerFilterBar = ({ activeAI, onAIChange }: ManagerFilterBarProps) => {
    const [now] = useState(new Date());
    const dateText = now.toLocaleDateString("th-TH", { weekday: 'long', day: "numeric", month: "long", year: "numeric" });
    const timeText = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น.";

    return (
        <div className="w-full flex items-center justify-start gap-5 py-3  shrink-0">
            <div className="flex items-center gap-2 cursor-pointer group">
                <div className="text-indigo-900 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-indigo-900">Hotel Bangkok</span>
                <ChevronDown className="w-3.5 h-3.5 text-indigo-900 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="h-5 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
                <div className="text-indigo-900 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-bold text-indigo-900" suppressHydrationWarning>{dateText}</span>
            </div>
            <div className="h-5 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
                <div className="text-indigo-900 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-bold text-indigo-900" suppressHydrationWarning>{timeText}</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
                <AIDropdown
                    selectedValue={activeAI}
                    onChange={onAIChange}
                />
            </div>
        </div>
    );
};
