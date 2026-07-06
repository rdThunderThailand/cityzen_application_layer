"use client";

import { useRouter } from "next/navigation";
import RegisterCard from "@/components/auth/RegisterCard";

export default function Register() {
    const router = useRouter();

    return(
        <div className="flex justify-center items-center min-h-screen">
            <RegisterCard onSwitchToLogin={() => router.push("/login")}/>
        </div>
    )
}