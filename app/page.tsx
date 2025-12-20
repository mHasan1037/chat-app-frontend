"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = (page: string) => {
    router.push(page);
  };

  return (
    <div className="min-h-screen center-position bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Chat Time</h1>
        <p className="text-gray-600 mb-8">
          Connect with friends and start chatting instantly
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleClick("register")}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium cursor-pointer hover:bg-blue-700 transition"
          >
            Sign up
          </button>
          <button
            onClick={() => handleClick("login")}
            className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
