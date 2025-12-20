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
    <nav className="bg-white">
      <div className="flex justify-center gap-8">
        {tabs.map((t) => {
        const active = pathname === t.href;

        return (
          <Link
            key={t.id}
            href={t.href}
            className={`py-3 px-2 font-medium transition ${
              active
                ? "border-b-2 text-blue-600 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
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
