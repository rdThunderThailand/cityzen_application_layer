import { cn } from '../../utils/cn';
import { Sparkles } from 'lucide-react';

export interface AIDropdownProps {
    selectedValue?: string | null;
    onChange?: (value: string | null) => void;
    className?: string;
}

export const AIDropdown = ({
    selectedValue,
    onChange,
    className,
}: AIDropdownProps) => {
    // If selectedValue is set, it means the panel is open
    const isActive = !!selectedValue;

    const handleClick = () => {
        if (onChange) {
            // Toggle between an active state ('executive') and null
            onChange(isActive ? null : 'executive');
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cn(
                "flex items-center gap-2 pl-1.5 pr-3 py-1 text-[13px] text-gray-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/20 select-none cursor-pointer bg-[#0166FF]/50",
                isActive
                    ? "font-medium shadow-xs"
                    : "hover:text-gray-600"
                , className
            )}
        >
            <div className={cn(
                "flex items-center justify-center w-5 h-5 rounded-md text-white transition-colors duration-200",
                isActive ? "bg-[#3037c7]" : "bg-[#3037c7]"
            )}>
                <Sparkles className="w-3 h-3" />
            </div>
            <span className="truncate font-bold">AI Executive Assistant</span>
        </button>
    );
};

export default AIDropdown;
