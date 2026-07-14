import { mock } from "./mock";

// TODO(ux): build this screen. Spec: docs/ORGANIC_SCREENS.md → "Operator · Tasks".
// Role: Operator. MOBILE-FIRST.
// Key interaction: "complete pickup" per task (pending → completed) — wire to a Server Action later.
// Data is mock-only (./mock.ts).
export default function OperatorTasksClient() {
  return (
    <main className="p-4">
      <h1 className="text-lg font-bold">Operator · Tasks</h1>
      <p className="text-sm text-gray-500">Scaffold — UI pending. See docs/ORGANIC_SCREENS.md.</p>
      <pre className="mt-4 overflow-auto text-xs">{JSON.stringify(mock, null, 2)}</pre>
    </main>
  );
}
