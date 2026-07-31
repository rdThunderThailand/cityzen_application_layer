"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginCard, { LoginCardValues } from "@/components/auth/LoginCard";
import { loginAction } from "@/features/auth/actions";

export default function LoginClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: LoginCardValues) => {
    setError(null);
    // loginAction redirects on success/no-access; only returns on failure.
    const result = await loginAction(email, password);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3">
      <LoginCard
        onSwitchToRegister={() => router.push("/register")}
        onSubmit={handleSubmit}
        onGoogleSignIn={() => { window.location.href = "/auth/oauth?provider=google"; }}
        onMicrosoftSignIn={() => { window.location.href = "/auth/oauth?provider=azure"; }}
      />
      {/* LoginCard has no error slot yet — UX team wires this into the card later */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
