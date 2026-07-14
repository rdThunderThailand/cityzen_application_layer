import { notFound } from "next/navigation";
import StoryboardStepClient from "@/features/resource-intelligence/executive/storyboard/StoryboardStepClient";
import { storyboardSteps } from "@/features/resource-intelligence/executive/storyboard/mock";

export default async function StoryboardStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  const stepNumber = Number(step);
  const storyboardStep = storyboardSteps.find((candidate) => Number(candidate.id) === stepNumber);

  if (!storyboardStep) {
    notFound();
  }

  return (
  <div className="relative mx-auto w-full h-full flex min-h-screen flex-col overflow-hidden bg-red-200 shadow-2xl">
     <StoryboardStepClient step={storyboardStep} totalSteps={storyboardSteps.length} />;
  </div>
 )
}
