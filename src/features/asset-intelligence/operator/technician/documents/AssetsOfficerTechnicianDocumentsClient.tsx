import { getTechnicianDocuments } from "./mock";
import DocumentsClient from "./DocumentsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianDocumentsClient() {
  return <DocumentsClient />;
}
