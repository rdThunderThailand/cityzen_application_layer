import Link from "next/link";
import { type CityzenRole } from "@/lib/roles";
import { subApps } from "./mock";
import { logoutAction } from "@/features/auth/actions";

type OverviewClientProps = {
  role: CityzenRole;
  tenantId: string;
  email: string;
};

export default function OverviewClient({ role, tenantId, email }: OverviewClientProps) {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">CityZen Overview</h1>
        <form action={logoutAction}>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors">
            ออกจากระบบ
          </button>
        </form>
      </div>
      <p className="text-sm text-gray-500">Scaffold — UI pending.</p>
      
      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Tenant ID:</strong> {tenantId}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <ul className="mt-6 space-y-4">
        {subApps.map((subApp) => (
          <li key={subApp.id}>
            <Link href={subApp.href} className="block p-4 border rounded hover:bg-gray-50">
              <h2 className="font-semibold text-lg">{subApp.name}</h2>
              <p className="text-sm text-gray-600">{subApp.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
