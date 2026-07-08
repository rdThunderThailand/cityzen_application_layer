import { mock } from "./mock";

// TODO(ux): build this screen. Spec: docs/ORGANIC_SCREENS.md → "Executive · Daily Brief".
// Role: Executive Viewer. Desktop-first. Data is mock-only (./mock.ts).
export default function DailyBriefClient() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Executive · Daily Brief</h1>
      <p className="text-sm text-gray-500">Scaffold — UI pending. See docs/ORGANIC_SCREENS.md.</p>
      <pre className="mt-4 overflow-auto text-xs">{JSON.stringify(mock, null, 2)}</pre>
    </main>
  );
}
