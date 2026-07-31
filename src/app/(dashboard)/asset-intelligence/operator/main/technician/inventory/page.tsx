import { AssetsOfficerTechnicianInventoryClient } from '@/features/asset-intelligence/operator/technician/inventory/AssetsOfficerTechnicianInventoryClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerInventoryPage(props: any) {
    return <AssetsOfficerTechnicianInventoryClient {...props} />
}
