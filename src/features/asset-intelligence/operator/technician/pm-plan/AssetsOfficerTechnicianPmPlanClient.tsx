import {
  getTechnicianPMPlanStats,
  getTechnicianPMFreqSummary,
  getTechnicianPMPlans
} from "./mock";
import { PMPlanClient } from "./PMPlanClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianPmPlanClient() {
  const [stats, freqSummary, plans] = await Promise.all([
    getTechnicianPMPlanStats(),
    getTechnicianPMFreqSummary(),
    getTechnicianPMPlans(),
  ]);

  return (
    <PMPlanClient
      stats={stats}
      freqSummary={freqSummary}
      initialPlans={plans}
    />
  );
}
