import { AssetsOfficerTechnicianHistoryClient } from '@/features/asset-intelligence/operator/technician/history/AssetsOfficerTechnicianHistoryClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerHistoryPage(props: any) {
    return <AssetsOfficerTechnicianHistoryClient {...props} />
}
