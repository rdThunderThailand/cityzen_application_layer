import { StoryboardHeader } from "@/components/storyboard/StoryboardHeader";
import { StoryboardStepNav } from "@/components/storyboard/StoryboardStepNav";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StoryboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto flex h-screen flex-col overflow-hidden bg-white px-4 py-4 shadow-2xl">
      <StoryboardHeader />

      <div className="mt-5 min-h-0 flex-1 mb-10">{children}</div>

      <StoryboardStepNav />

      <Link
        href="/resource-intelligence/executive/daily-brief"
        className="absolute bottom-4 right-4 transform flex items-center gap-2 text-md font-bold text-blue-800 mt-2"
      >
        เข้าสู่ Executive Workspace
        <ArrowRight className="h-6 w-6" />
      </Link>
    </main>
  );
}
