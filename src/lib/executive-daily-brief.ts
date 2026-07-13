import { getDbClient } from "./supabase-db";

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
  const core = getDbClient("core");
  const disasterOps = getDbClient("disaster_ops");

  if (!core || !disasterOps) {
    return null;
  }

  try {
    // ponytail: resources/missions queries below still aren't tenant-scoped.
    // thundercore_department_id exists on both tables but is null on every seeded row
    // (confirmed 2026-07-13) — there's no department assignment to join through yet.
    // Scoping them needs a data-model decision (who assigns a resource/mission to a
    // department?), not just a query change. incidents *is* scoped below via districts.
    const [
      { data: kpiSnapshots, error: kpiError },
      { data: activeIncidents, error: incidentsError, count: incidentsCountVal },
      { data: resources, error: resourcesError },
      { error: missionsError, count: missionsCountVal }
    ] = await Promise.all([
      core.from("kpi_snapshots").select("metric_name, value, trend_percent, direction").eq("thundercore_tenant_id", tenantId).eq("module", "city_pulse"),
      disasterOps.from("incidents").select("impact_count, districts!inner(thundercore_tenant_id)", { count: "exact" }).eq("status", "active").eq("districts.thundercore_tenant_id", tenantId),
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
  } catch (error) {
    console.error("[executive-daily-brief] KPI query failed", { tenantId, error });
    return null;
  }
}
