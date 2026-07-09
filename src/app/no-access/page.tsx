import Link from "next/link";

export default async function NoAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  // reason=revoked → the liveness guard blocked a suspended/revoked membership (ADR 0004).
  const isRevoked = (await searchParams).reason === "revoked";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">No access</h1>
      <p className="max-w-md text-sm text-gray-600">
        {isRevoked
          ? "สิทธิ์การเข้าใช้งานของคุณถูกถอนหรือถูกระงับ กรุณาติดต่อผู้ดูแลองค์กรของคุณ"
          : "Your account has no CityZen workspace membership for this organization. Contact your organization owner to be granted a role."}
      </p>
      <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Back to sign in
      </Link>
    </div>
  );
}
