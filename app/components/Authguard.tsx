"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Authguard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;
  return <>{children}</>;
};

export default Authguard;
