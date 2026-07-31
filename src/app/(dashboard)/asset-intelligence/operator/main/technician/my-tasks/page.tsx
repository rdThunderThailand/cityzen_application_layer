import { AssetsOfficerTechnicianMyTasksClient } from '@/features/asset-intelligence/operator/technician/my-tasks/AssetsOfficerTechnicianMyTasksClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerMyTasksPage(props: any) {
    return <AssetsOfficerTechnicianMyTasksClient {...props} />
}
