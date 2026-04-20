"use client";

import { useState } from "react";
import Link from "next/link";
import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";

export default function RecoverAccount() {
  const [email, setEmail] = useState("");

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recovery email submitted:", email);
  };

  return (
    <div className="min-h-screen center-position">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Recover Account</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleRecover} className="flex flex-col gap-4">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
          <AuthButton title="Send Reset Link" />
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}