"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
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
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginCard onSwitchToRegister={() => router.push("/register")} onSubmit={handleSubmit} />
    </div>
  )
}
