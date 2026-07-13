import { createClient } from "@supabase/supabase-js";

const makeCoreClient = (url: string, key: string) =>
  createClient(url, key, { auth: { persistSession: false }, db: { schema: "core" } });
const makeDisasterOpsClient = (url: string, key: string) =>
  createClient(url, key, { auth: { persistSession: false }, db: { schema: "disaster_ops" } });

let cachedCore: ReturnType<typeof makeCoreClient> | null | undefined;
let cachedDisasterOps: ReturnType<typeof makeDisasterOpsClient> | null | undefined;

function coreDb() {
  if (cachedCore !== undefined) return cachedCore;
  const url = process.env.CITYZEN_DIRECTORY_DB_URL;
  const key = process.env.CITYZEN_DIRECTORY_DB_KEY;
  cachedCore = url && key ? makeCoreClient(url, key) : null;
  return cachedCore;
}
function disasterOpsDb() {
  if (cachedDisasterOps !== undefined) return cachedDisasterOps;
  const url = process.env.CITYZEN_DIRECTORY_DB_URL;
  const key = process.env.CITYZEN_DIRECTORY_DB_KEY;
  cachedDisasterOps = url && key ? makeDisasterOpsClient(url, key) : null;
  return cachedDisasterOps;
}

export type ExecutiveKpiValues = {
  incidentsCount: number;
  peopleAffectedCount: number;
  touristsTodayCount: number;
  touristsTodayTrend: number;
  positiveImpactValue: number;
  positiveImpactTrend: number;
  readinessPercent: number;
  missionsInProgressCount: number;
};

export async function getExecutiveDailyBriefKpis(tenantId: string): Promise<ExecutiveKpiValues | null> {
  const core = coreDb();
  const disasterOps = disasterOpsDb();

  if (!core || !disasterOps) {
    return null;
  }

  try {
    // ponytail: disaster_ops queries below aren't tenant-scoped (no join through
    // districts/departments across schemas) — fine for the single demo tenant.
    // Add the join when a second tenant needs real disaster_ops data.
    const [
      { data: kpiSnapshots, error: kpiError },
      { data: activeIncidents, error: incidentsError, count: incidentsCountVal },
      { data: resources, error: resourcesError },
      { error: missionsError, count: missionsCountVal }
    ] = await Promise.all([
      core.from("kpi_snapshots").select("metric_name, value, trend_percent, direction").eq("thundercore_tenant_id", tenantId).eq("module", "city_pulse"),
      disasterOps.from("incidents").select("impact_count", { count: "exact" }).eq("status", "active"),
      disasterOps.from("resources").select("readiness_percent"),
      disasterOps.from("missions").select("*", { count: "exact", head: true }).eq("status", "in_progress")
    ]);

    if (kpiError) throw kpiError;
    if (incidentsError) throw incidentsError;
    if (resourcesError) throw resourcesError;
    if (missionsError) throw missionsError;

    if (!kpiSnapshots) return null;

    const touristsRow = kpiSnapshots.find(r => r.metric_name === "นักท่องเที่ยววันนี้");
    const impactRow = kpiSnapshots.find(r => r.metric_name === "ผลกระทบเชิงบวก");

    if (!touristsRow || !impactRow) return null;

    const touristsTodayCount = Number(touristsRow.value);
    const touristsTodayTrend = touristsRow.direction === "down" ? -Number(touristsRow.trend_percent) : Number(touristsRow.trend_percent);

    const positiveImpactValue = Number(impactRow.value);
    const positiveImpactTrend = impactRow.direction === "down" ? -Number(impactRow.trend_percent) : Number(impactRow.trend_percent);

    const incidentsCount = incidentsCountVal ?? 0;
    const peopleAffectedCount = (activeIncidents ?? []).reduce((sum, row) => sum + (Number(row.impact_count) || 0), 0);

    let readinessPercent = 0;
    if (resources && resources.length > 0) {
      const sum = resources.reduce((acc, row) => acc + (Number(row.readiness_percent) || 0), 0);
      readinessPercent = Math.round(sum / resources.length);
    }

    const missionsInProgressCount = missionsCountVal ?? 0;

    return {
      incidentsCount,
      peopleAffectedCount,
      touristsTodayCount,
      touristsTodayTrend,
      positiveImpactValue,
      positiveImpactTrend,
      readinessPercent,
      missionsInProgressCount,
    };
  } catch {
    return null;
  }
}
