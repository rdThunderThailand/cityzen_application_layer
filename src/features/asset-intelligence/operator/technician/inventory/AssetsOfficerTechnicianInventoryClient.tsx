import { getTechnicianInventory } from "./mock";
import InventoryClient from "./InventoryClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianInventoryClient() {
  return <InventoryClient />;
}
