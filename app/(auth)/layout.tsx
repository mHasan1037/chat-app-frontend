"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "../hooks/useAuthUser";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useAuthUser();

  useEffect(() => {
    if (data) router.replace("/chats");
  }, [data, router]);

  if (isLoading || data) return null;
  return <>{children}</>;
}