import { getWorkspaceUser } from "@/lib/workspace-user";
import LayoutShell from "./LayoutShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getWorkspaceUser();
    return <LayoutShell user={user}>{children}</LayoutShell>;
}
