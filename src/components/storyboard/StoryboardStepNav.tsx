"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

const FIRST_STEP = 1;
const AUTO_ADVANCE_MS = 4_000;
const STORY_AUTO_ADVANCE_MS = 10_000;
const STORY_AUTO_ADVANCE_STEPS = [3, 4];

const APPS = [
  { basePath: "/resource-intelligence/executive/storyboard", lastStep: 11 },
  { basePath: "/resource-intelligence/manager/storyboard", lastStep: 12 },
];

export function StoryboardStepNav() {
  const pathname = usePathname();
  const router = useRouter();
  const app = APPS.find((candidate) => pathname.startsWith(candidate.basePath)) ?? APPS[0];
  const BASE_PATH = app.basePath;
  const LAST_STEP = app.lastStep;
  const currentStep = Number(pathname.slice(BASE_PATH.length + 1));
  const isValidStep = Number.isInteger(currentStep) && currentStep >= FIRST_STEP && currentStep <= LAST_STEP;

  useEffect(() => {
    if (!isValidStep) return;

    const autoAdvanceMs =
      currentStep === FIRST_STEP
        ? AUTO_ADVANCE_MS
        : STORY_AUTO_ADVANCE_STEPS.includes(currentStep)
          ? STORY_AUTO_ADVANCE_MS
          : null;

    if (autoAdvanceMs === null) return;

    const timer = window.setTimeout(() => {
      router.push(`${BASE_PATH}/${currentStep + 1}`);
    }, autoAdvanceMs);

    return () => window.clearTimeout(timer);
  }, [isValidStep, currentStep, router]);

  if (!isValidStep || currentStep === 1 || currentStep === 2) {
    return null;
  }

  const disabledClasses = "pointer-events-none opacity-30";
  const buttonClasses = "flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:border-blue-500 hover:text-blue-700";

  return (
    <div className="-mt-8 flex shrink-0 items-center justify-start gap-2">
      <Link
        href={`${BASE_PATH}/${currentStep - 1}`}
        className={cn(buttonClasses, currentStep === FIRST_STEP && disabledClasses)}
        aria-disabled={currentStep === FIRST_STEP}
      >
        <ChevronLeft className="h-4 w-4" />
        ก่อนหน้า
      </Link>
      <Link
        href={`${BASE_PATH}/${currentStep + 1}`}
        className={cn(buttonClasses, currentStep === LAST_STEP && disabledClasses)}
        aria-disabled={currentStep === LAST_STEP}
      >
        ต่อไป
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
