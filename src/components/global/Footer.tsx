import { cn } from "../../utils/cn";
import { type ReactNode } from "react";

export interface FooterProps {
    content?: () => ReactNode;
    className?: string;
}

export const Footer = ({ content, className }: FooterProps) => {
    return (
        <div className={cn("mt-auto flex items-center gap-2 text-xs font-medium text-gray-400", className)}>
            {content?.()}
        </div>
    );
};