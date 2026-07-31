import { AssetsOfficerTechnicianWorkOrdersClient } from '@/features/asset-intelligence/operator/technician/work-orders/AssetsOfficerTechnicianWorkOrdersClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerWorkOrdersPage(props: any) {
    return <AssetsOfficerTechnicianWorkOrdersClient {...props} />
}
