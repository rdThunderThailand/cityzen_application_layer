"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterCard, { RegisterCardValues } from "@/components/auth/RegisterCard";
import { registerAction } from "@/features/auth/actions";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async ({ name, email, password }: RegisterCardValues) => {
        setError(null);
        // registerAction redirects to /login on success; only returns on failure.
        const result = await registerAction({ name, email, password });
        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-3">
            <RegisterCard
              onSubmit={handleSubmit}
              onSwitchToLogin={() => router.push("/login")}
              onGoogleSignUp={() => { window.location.href = "/auth/oauth?provider=google"; }}
              onMicrosoftSignUp={() => { window.location.href = "/auth/oauth?provider=azure"; }}
            />
            {/* RegisterCard has no error slot yet — mirror LoginClient and render below the card */}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
