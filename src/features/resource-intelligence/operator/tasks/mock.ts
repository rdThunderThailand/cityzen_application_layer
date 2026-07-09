// Placeholder mock — UX/data team owns the final shape. See docs/ORGANIC_SCREENS.md.
export type PickupTask = {
  id: string;
  location: string;
  status: "pending" | "completed";
};

export const mock: PickupTask[] = [
  { id: "t1", location: "Placeholder point A", status: "pending" },
  { id: "t2", location: "Placeholder point B", status: "pending" },
];
