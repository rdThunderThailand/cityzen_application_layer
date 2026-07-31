import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface TechnicianPageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export function TechnicianPageLayout({
  title,
  description,
  breadcrumbs,
  headerActions,
  children,
}: TechnicianPageLayoutProps) {
  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div className="flex flex-col">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-4">
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={idx}>
                  {bc.href ? (
                    <Link href={bc.href} className="cursor-pointer hover:text-blue-600 transition-colors">
                      {bc.label}
                    </Link>
                  ) : (
                    <span className={idx === breadcrumbs.length - 1 ? "font-bold text-slate-800" : ""}>
                      {bc.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
                </React.Fragment>
              ))}
            </div>
          )}

          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-[14px] font-medium text-slate-500 max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {headerActions && (
          <div className="flex items-center gap-4">
            {headerActions}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
