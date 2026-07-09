import { mock } from "./mock";

// TODO(ux): build this screen. Spec: docs/ORGANIC_SCREENS.md → "Owner · Dashboard".
// Role: Organization Owner. Desktop-first.
// Key interaction: a "แจ้งพร้อมรับ" (mark ready-for-pickup) button — wire to a Server Action later.
// Data is mock-only (./mock.ts).
export default function OwnerDashboardClient() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Owner · Dashboard</h1>
      <p className="text-sm text-gray-500">Scaffold — UI pending. See docs/ORGANIC_SCREENS.md.</p>
      <pre className="mt-4 overflow-auto text-xs">{JSON.stringify(mock, null, 2)}</pre>
    </main>
  );
}
