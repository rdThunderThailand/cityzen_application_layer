import { StoryboardStepCard } from "@/features/resource-intelligence/executive/storyboard/components/StoryboardStepCard";
import { storyboardSteps } from "@/features/resource-intelligence/executive/storyboard/mock";
import { notFound } from "next/navigation";

export default async function StoryboardStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step: stepParam } = await params;
  const stepNumber = Number(stepParam);

  if (!Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > storyboardSteps.length) {
    notFound();
  }

  const step = storyboardSteps[stepNumber - 1];

  return (
    <div className="h-full w-full">
      <StoryboardStepCard step={step} />
    </div>
  );
}
