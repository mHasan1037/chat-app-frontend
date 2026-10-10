"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar = () => {
  const pathname = usePathname();

  const tabs = [
    { id: "messages", label: "Messages", href: "/chats" },
    { id: "status", label: "Status", href: "/status" },
    { id: "connections", label: "Connections", href: "/friends" },
  ];

  return (
    <nav className="sticky top-[73px] z-30 border-b border-white/60 bg-white/55 px-3 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl justify-center gap-2 rounded-full border border-white/70 bg-white/70 p-1 shadow-lg shadow-slate-900/5">
        {tabs.map((t) => {
          const active = pathname === t.href;

          return (
            <Link
              key={t.id}
              href={t.href}
              className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-6 ${
                active
                  ? "bg-slate-950 text-white shadow-md shadow-slate-900/20"
                  : "text-slate-600 hover:bg-white hover:text-blue-600"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
