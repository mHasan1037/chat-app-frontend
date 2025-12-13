"use client";
import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { loginUser } from "@/app/services/authService";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
       const data = await loginUser({email, password});
       localStorage.setItem('token', data.token);
       window.location.href = "/chats";
    }catch(error: any){
       console.log(error.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen center-position">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

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
          <AuthButton title="Login" />
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link href="/register" className="text-blue-600 font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
