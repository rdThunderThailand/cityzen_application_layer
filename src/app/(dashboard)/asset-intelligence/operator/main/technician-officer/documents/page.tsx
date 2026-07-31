import { AssetsOfficerTechnicianDocumentsClient } from '@/features/asset-intelligence/operator/technician/documents/AssetsOfficerTechnicianDocumentsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerDocumentsPage(props: any) {
    return <AssetsOfficerTechnicianDocumentsClient {...props} />
}
