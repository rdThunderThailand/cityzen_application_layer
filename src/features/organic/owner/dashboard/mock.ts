// Placeholder mock — UX/data team owns the final shape. See docs/ORGANIC_SCREENS.md.
export type OwnerDashboard = {
  tenantName: string;
  isReadyForPickup: boolean; // drives the "แจ้งพร้อมรับ" (ready-for-pickup) button state
  kpis: { label: string; value: string }[];
};

export const mock: OwnerDashboard = {
  tenantName: "Placeholder Org",
  isReadyForPickup: false,
  kpis: [
    { label: "Pending pickups", value: "0" },
    { label: "This week (kg)", value: "0" },
  ],
};
