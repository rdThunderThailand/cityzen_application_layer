import { AssetsOfficerTechnicianToolsClient } from '@/features/asset-intelligence/operator/technician/tools/AssetsOfficerTechnicianToolsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerToolsPage(props: any) {
    return <AssetsOfficerTechnicianToolsClient {...props} />
}
