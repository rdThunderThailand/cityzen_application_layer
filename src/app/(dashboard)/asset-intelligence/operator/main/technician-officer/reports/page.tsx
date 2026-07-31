import { AssetsOfficerTechnicianReportsClient } from '@/features/asset-intelligence/operator/technician/reports/AssetsOfficerTechnicianReportsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerReportsPage(props: any) {
    return <AssetsOfficerTechnicianReportsClient {...props} />
}
