"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthUser } from "../hooks/useAuthUser";

const Authguard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useAuthUser();

  useEffect(() => {
    if (isError) router.replace("/login");
  }, [isError, router]);

  if (isLoading || !data) return null;
  return <>{children}</>;
};

export default Authguard;
