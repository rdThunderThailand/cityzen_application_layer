// Placeholder mock — UX/data team owns the final shape. See docs/ORGANIC_SCREENS.md.
export type DailyBrief = {
  date: string;
  headline: string;
  kpis: { label: string; value: string }[];
};

export const mock: DailyBrief = {
  date: "2026-07-17",
  headline: "Placeholder daily brief",
  kpis: [
    { label: "Collected today (kg)", value: "0" },
    { label: "Active routes", value: "0" },
  ],
};
