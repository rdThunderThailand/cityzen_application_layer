import { getTechnicianInspectionDetail } from "./mock";
import { notFound } from "next/navigation";
import { InspectionDetailClient } from "./InspectionDetailClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

interface PageProps {
  params: {
    id: string;
  };
}

export async function AssetsOfficerTechnicianInspectionsidClient({ params }: PageProps) {
  const detail = await getTechnicianInspectionDetail(params.id);

  if (!detail) {
    return notFound();
  }

  return (
    <InspectionDetailClient detail={detail} />
  );
}
