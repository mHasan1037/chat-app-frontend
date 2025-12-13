"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = (page: string) => {
    router.push(page);
  };

  return (
    <div>
      <p>Welcome to chat app</p>
      <div>
        <button onClick={() => handleClick("register")} className="cursor-pointer">Sign up</button>
        <button onClick={() => handleClick("login")} className="cursor-pointer">Log in</button>
      </div>
    </div>
  );
}
