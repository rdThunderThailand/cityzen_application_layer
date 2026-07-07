import { redirect } from "next/navigation";

// Role landing → default page. proxy.ts already gates this prefix to Organization Owner (+ super_admin).
export default function OwnerLanding() {
  redirect("/organic/owner/dashboard");
}
