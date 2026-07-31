import { AssetsOfficerTechnicianRequestsClient } from '@/features/asset-intelligence/operator/technician/requests/AssetsOfficerTechnicianRequestsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerRequestsPage(props: any) {
    return <AssetsOfficerTechnicianRequestsClient {...props} />
}
