"use client";

import { useState } from "react";
import Link from "next/link";
import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { sendResetPasswordEmail } from "@/app/services/authService";
import { toast } from "react-toastify";

export default function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendResetPasswordEmail(email);
      setEmail("");
      toast.success("Check your email");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen center-position px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <h1 className="text-3xl font-black text-slate-950 mb-2 text-center">Recover Account</h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={handleRecover} className="flex flex-col gap-4">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
          <AuthButton title="Send Reset Link" loading={isloading} />
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-bold font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
