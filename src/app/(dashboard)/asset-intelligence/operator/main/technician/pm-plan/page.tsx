import { AssetsOfficerTechnicianPmPlanClient } from '@/features/asset-intelligence/operator/technician/pm-plan/AssetsOfficerTechnicianPmPlanClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerPmPlanPage(props: any) {
    return <AssetsOfficerTechnicianPmPlanClient {...props} />
}
