import { AssetsOfficerTechnicianSettingsClient } from '@/features/asset-intelligence/operator/technician/settings/AssetsOfficerTechnicianSettingsClient'

export const dynamic = 'force-dynamic'

export default async function TechnicianOfficerSettingsPage(props: any) {
    return <AssetsOfficerTechnicianSettingsClient {...props} />
}
