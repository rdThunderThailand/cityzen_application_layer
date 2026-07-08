import { StoryboardHeader } from "./components/StoryboardHeader";
import { StoryboardStepCard } from "./components/StoryboardStepCard";
import { WorkspacePanel } from "./components/WorkspacePanel";
import { storyboardSteps } from "./mock";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OwnerStoryboardClient() {
  const topRows = storyboardSteps.slice(0, 13);

  return (
    <main className="relative mx-auto flex min-h-screen flex-col overflow-hidden bg-white px-7 py-8 shadow-2xl">
      <StoryboardHeader />

      <section className="mt-5 grid flex-1 grid-cols-5 auto-rows-[230px] gap-3">
        {topRows.map((step) => (
          <div key={step.id} className="min-h-0">
            <StoryboardStepCard step={step} />
          </div>
        ))}
        <WorkspacePanel />
      </section>
      <Link href="/organic/owner/dashboard" className="absolute bottom-4 right-1 transform -translate-x-1/2 flex items-center gap-2 text-xl font-bold text-blue-800">
        เข้าสู่ Executive Workspace
        <ArrowRight className="h-6 w-6" />
      </Link>
    </main >
  );
}
