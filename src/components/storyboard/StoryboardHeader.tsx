"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logoFull from "../../../public/logo-full.png";
import { profile as executiveProfile, trustPillars as executiveTrustPillars } from "../../features/resource-intelligence/executive/storyboard/mock";
import { profile as managerProfile, trustPillars as managerTrustPillars } from "@/features/resource-intelligence/manager/storyboard/mock";
import { LiveDateTime } from "./LiveDateTime";

const MANAGER_PREFIX = "/resource-intelligence/manager/storyboard";

export function StoryboardHeader() {
  const pathname = usePathname();
  const isManager = pathname.startsWith(MANAGER_PREFIX);

  const profile = isManager ? managerProfile : executiveProfile;
  const trustPillars = isManager ? managerTrustPillars : executiveTrustPillars;
  const title = isManager ? "CityZen Manager Office Storyboard" : "CityZen Executive Office Storyboard";
  const subtitle = isManager
    ? "ผู้จัดการโรงแรม เพื่อการจัดการอย่างเป็นระบบ"
    : "สำนักงานผู้บริหารจังหวัด เพื่อการตัดสินใจที่มีหลักฐาน โปร่งใส และตรวจสอบได้";

  return (
    <header className="flex items-center justify-between gap-5">
      <div className="flex min-w-0 items-center gap-6">
        <Image
          src={logoFull}
          alt="CityZen Executive Command Center"
          className="h-12 w-auto shrink-0 object-contain"
          loading="eager"
          priority
        />
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-normal text-slate-900">{title}</h1>
          <p className="truncate text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-3 xl:flex">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <p className="text-[10px] font-bold leading-3 text-slate-900">{pillar.title}</p>
                  <p className="text-[9px] leading-3 text-slate-500">{pillar.subtitle}</p>
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-[linear-gradient(135deg,#dbeafe,#94a3b8)]" />
          <div>
            <p className="text-sm font-bold text-slate-900">{profile.name}</p>
            <p className="text-xs text-slate-500">{profile.role}</p>
            <LiveDateTime />
          </div>
        </div>
      </div>
    </header>
  );
}
