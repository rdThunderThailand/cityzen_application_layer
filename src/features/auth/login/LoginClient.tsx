"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import LoginCard, { LoginCardValues } from "@/components/auth/LoginCard";

export default function LoginClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = async ({ email, password }: LoginCardValues) => {
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Full navigation so the /auth/session route handler runs and sets cityzen_session.
      window.location.href = "/auth/session";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginCard onSwitchToRegister={() => router.push("/register")} onSubmit={handleSubmit} />
    </div>
  )
}
