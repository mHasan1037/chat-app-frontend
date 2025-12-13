"use client";

import AuthButton from "@/app/components/AuthButton";
import AuthInput from "@/app/components/AuthInput";
import { registerUser } from "@/app/services/authService";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
      const data = await registerUser({name, email, password});
      localStorage.setItem('token', data.token);
    }catch(error: any){
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen center-position px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
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
          <AuthButton title="Sign up" />
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
