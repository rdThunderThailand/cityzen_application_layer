"use client";

import React from "react";

export default function Map({ children }: any) {
  return (
    <div className="relative w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
      {children}
    </div>
  );
}

export function Marker({ children }: any) {
  return <div className="absolute z-10">{children}</div>;
}

export function Source({ children }: any) {
  return <>{children}</>;
}

export function Layer(props: any) {
  return null;
}

export function NavigationControl(props: any) {
  return null;
}
