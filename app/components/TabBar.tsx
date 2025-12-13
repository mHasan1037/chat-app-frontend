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
    <div>
      {tabs.map((t) => {
        const active = pathname === t.href;

        return (
          <Link
            key={t.id}
            href={t.href}
            className={`text-center py-3 font-medium ${
              active
                ? "border-b-2 text-blue-600 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};

export default TabBar;
