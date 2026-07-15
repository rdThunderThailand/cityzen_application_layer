import { StoryboardStepCardManager } from "@/features/resource-intelligence/manager/storyboard/StoryboardStepCardManager";
import { storyboardSteps } from "@/features/resource-intelligence/manager/storyboard/mock";
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
      <StoryboardStepCardManager step={step} />
    </div>
  );
}
