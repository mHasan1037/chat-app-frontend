"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = (page: string) => {
    router.push(page);
  };

  return (
    <div className="min-h-screen center-position px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 text-center shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-xl shadow-blue-500/25" />
        <h1 className="mb-3 text-4xl font-black tracking-normal text-slate-950">Chat Time</h1>
        <p className="mb-8 text-sm font-medium leading-6 text-slate-500">
          Connect with friends and start chatting instantly
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleClick("register")}
            className="btn-primary w-full rounded-full py-3 font-bold"
          >
            Sign up
          </button>
          <button
            onClick={() => handleClick("login")}
            className="w-full cursor-pointer rounded-full border border-slate-200 bg-white py-3 font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
