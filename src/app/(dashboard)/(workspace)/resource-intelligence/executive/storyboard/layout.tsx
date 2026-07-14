import { StoryboardHeader } from "@/features/resource-intelligence/executive/storyboard/components/StoryboardHeader";

export default function StoryboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto flex max-h-screen flex-col bg-white px-4 py-4 shadow-2xl">
      <StoryboardHeader />
      {children}
    </main>
  );
}
