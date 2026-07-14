import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
    value: string | number;
    title: string;
    count?: number;
    content?: () => ReactNode;
}

export interface TabsProps {
    tabs: TabItem[];
    activeValue?: string | number;
    onChange?: (value: string | number) => void;
    className?: string;
    /** Fill the parent's height and let the active tab's content panel absorb the remaining space. */
    fill?: boolean;
}

export const Tabs = ({
    tabs,
    activeValue,
    onChange,
    className,
    fill = false,
}: TabsProps) => {
    const [active, setActive] = useState<string | number>(
        activeValue ?? tabs[0]?.value
    );

    useEffect(() => {
        if (activeValue !== undefined) {
            setActive(activeValue);
        }
    }, [activeValue]);

    const handleSelect = (tab: TabItem) => {
        setActive(tab.value);
        if (onChange) {
            onChange(tab.value);
        } else {
            console.log(`[Tabs Mock Action] Selected: ${tab.title} (${tab.value})`);
        }
    };

    const activeTab = tabs.find((tab) => tab.value === active);

    return (
        <div className={cn("w-full", fill && "h-full flex flex-col", className)}>
            <div className="flex items-center gap-1 border-b border-gray-200 shrink-0">
                {tabs.map((tab) => {
                    const isActive = active === tab.value;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => handleSelect(tab)}
                            className={cn(
                                "relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 select-none cursor-pointer",
                                isActive
                                    ? "text-[#3B82F6]"
                                    : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {tab.title} {tab?.count && <span>({tab.count})</span>}
                            {isActive && (
                                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#3B82F6] rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {activeTab?.content && (
                <div className={cn("py-4 text-sm text-slate-600", fill && "flex-1 min-h-0 overflow-hidden")}>
                    {activeTab.content()}
                </div>
            )}
        </div>
    );
};

export default Tabs;
