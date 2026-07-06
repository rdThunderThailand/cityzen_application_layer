"use client";

import { useRouter } from "next/navigation";
import LoginCard from "@/components/auth/LoginCard";

export default function Login() {
    const router = useRouter();

    return(
        <div className="flex justify-center items-center min-h-screen">
            <LoginCard onSwitchToRegister={() => router.push("/register")}/>
        </div>
    )
}