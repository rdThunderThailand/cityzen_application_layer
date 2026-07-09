import { redirect } from "next/navigation";

// Role landing → default page. proxy.ts already gates this prefix to Executive Viewer (+ super_admin).
export default function ExecutiveLanding() {
  redirect("/organic/executive/daily-brief");
}
