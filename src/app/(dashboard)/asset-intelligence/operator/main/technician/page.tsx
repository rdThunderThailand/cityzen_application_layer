import { AssetsOfficerTechnicianClient } from '@/features/asset-intelligence/operator/technician/AssetsOfficerTechnicianClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerHomePage(props: any) {
    return <AssetsOfficerTechnicianClient {...props} />
}
