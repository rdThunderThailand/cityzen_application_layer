import { redirect } from "next/navigation";

// Role landing → default page. proxy.ts already gates this prefix to Operator (+ super_admin).
export default function OperatorLanding() {
  redirect("/organic/operator/tasks");
}
