"use client";

import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { registerUser } from "@/app/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fields = [
      { value: name.trim(), message: "Please enter your name" },
      { value: email.trim(), message: "Please enter your email" },
      { value: password, message: "Please enter your password" },
    ];

    const missing = fields.find((f) => !f.value);
    if (missing) {
      toast.info(missing.message);
      setIsLoading(false);
      return;
    }

    try {
      registerUser({ name, email, password });
      router.push("/chats");
    } catch (error: any) {
      console.log(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen center-position px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-black text-slate-950">Create Account</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Join Chat Time and start messaging.</p>
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <AuthInput
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="Your full name"
          />
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Your email"
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Choose a strong password"
          />
          <AuthButton title="Sign up" loading={isLoading} />
        </form>
        <p className="mt-5 text-center text-sm font-medium text-slate-500">
          Already have an account? <Link href="/login" className="font-bold text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
