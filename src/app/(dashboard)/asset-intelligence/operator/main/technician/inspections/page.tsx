import { AssetsOfficerTechnicianInspectionsClient } from '@/features/asset-intelligence/operator/technician/inspections/AssetsOfficerTechnicianInspectionsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerInspectionsPage(props: any) {
    return <AssetsOfficerTechnicianInspectionsClient {...props} />
}
