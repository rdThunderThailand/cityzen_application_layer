import { getInspectionOrder } from "./mock";
import { notFound } from "next/navigation";
import { InspectionDetailClient } from "./InspectionDetailClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function AssetsOfficerTechnicianInspectionsidClient({ params }: PageProps) {
  const { id } = await params;
  const initialInspectionOrder = await getInspectionOrder(id);

  if (!initialInspectionOrder) {
    return notFound();
  }

  return (
    <InspectionDetailClient initialInspectionOrder={initialInspectionOrder} />
  );
}
