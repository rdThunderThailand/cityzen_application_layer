"use client";

import React from "react";

interface WithChildren { children?: React.ReactNode; }

export default function Map({ children }: WithChildren) {
  return (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
      {children}
    </div>
  );
}

export function Marker({ children }: WithChildren) {
  return <div className="absolute z-10">{children}</div>;
}

export function Source({ children }: WithChildren) {
  return <>{children}</>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Layer(_props: Record<string, unknown>) {
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NavigationControl(_props: Record<string, unknown>) {
  return null;
}
