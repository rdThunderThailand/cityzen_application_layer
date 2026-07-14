import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryboardStepCard } from "./components/StoryboardStepCard";
import { WorkspacePanel } from "./components/WorkspacePanel";
import type { StoryboardStep } from "./mock";

const STORYBOARD_BASE = "/resource-intelligence/executive/storyboard";

export default function StoryboardStepClient({
  step,
  totalSteps,
}: {
  step: StoryboardStep;
  totalSteps: number;
}) {
  const stepNumber = Number(step.id);
  const isFirstStep = stepNumber <= 1;
  const isLastStep = stepNumber >= totalSteps;

  return (
    <div className="flex flex-1 flex-col h-full ">
      <section className="flex w-full h-full flex-1 flex-col gap-3 py-4">
        <div className="min-h-screen flex-1">
          <StoryboardStepCard step={step} />
        </div>
        {isLastStep && (
          <div className="min-h-0 flex-1">
            <WorkspacePanel />
          </div>
        )}
      </section>

      <div className="flex items-center justify-between pb-2">
        {isFirstStep ? (
          <span />
        ) : (
          <Link
            href={`${STORYBOARD_BASE}/${stepNumber - 1}`}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            ก่อนหน้า
          </Link>
        )}

        {isLastStep ? (
          <Link
            href="/resource-intelligence/executive/daily-brief"
            className="flex items-center gap-2 text-xl font-bold text-blue-800"
          >
            เข้าสู่ Executive Workspace
            <ArrowRight className="h-6 w-6" />
          </Link>
        ) : (
          <Link
            href={`${STORYBOARD_BASE}/${stepNumber + 1}`}
            className="flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            ถัดไป
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
