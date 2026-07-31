import { getWorkspaceUser } from "@/lib/workspace-user";
import { operatorUser } from "@/components/global/mockUserData";
import MainClient from "@/features/asset-intelligence/operator/main/MainClient";

export default async function Main() {
    const { user } = await getWorkspaceUser("operator");
    return <MainClient user={user ?? operatorUser} />;
}