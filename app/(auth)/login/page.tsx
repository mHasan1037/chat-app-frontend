"use client";
import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { loginUser } from "@/app/services/authService";
import Link from "next/link";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const fields = [
      { value: email.trim(), message: "Please enter your email" },
      { value: password, message: "Please enter your password" },
    ];

    const missing = fields.find((f) => !f.value);
    if (missing) {
      toast.info(missing.message);
      return;
    }

    setIsLoading(true);

    try {
      await loginUser({ email, password });
      router.push("/chats");
      router.refresh();
    } catch (error: any) {
      console.log(error.response?.data?.message);
      toast.info("Incorrect information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen center-position px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-black text-slate-950">Welcome Back</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Log in to continue the conversation.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />
          <AuthButton title="Login" loading={isLoading} />
        </form>
        <div className="mt-5 flex flex-col gap-2 text-center text-sm font-medium text-slate-500">
          <Link href="/recoverAccount" className="cursor-pointer text-blue-600 hover:underline">Forgot Password?</Link>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-blue-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
