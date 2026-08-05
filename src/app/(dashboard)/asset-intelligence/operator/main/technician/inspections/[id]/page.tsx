import { AssetsOfficerTechnicianInspectionsidClient } from '@/features/asset-intelligence/operator/technician/inspections/[id]/AssetsOfficerTechnicianInspectionsidClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerInspectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <AssetsOfficerTechnicianInspectionsidClient params={params} />;
}
