import { redirect } from "next/navigation";

// Role landing → default page. proxy.ts already gates this prefix to Manager (+ super_admin).
export default function ManagerLanding() {
  redirect("/resource-intelligence/manager/dashboard");
}
